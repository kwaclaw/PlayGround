import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util';

import { TemplatedElement } from './templated-element.js';

const _model = new WeakMap();

const _startTime = performance.now();

let _renderCount = 0;
let _lastRendered = performance.now();
let _timerID = null;
const _reactions = new Set();

function _runReaction() {
  _reactions.forEach((reaction) => {
    try { reaction(); } catch { }
  });
  _timerID = null;
  _lastRendered = performance.now();
  _reactions.clear();
}

// try to run at most every 15 milliseconds
function _schedule(reaction) {
  _reactions.add(reaction);
  if (_timerID) {
    return;
  }

  const now = performance.now();
  const delta = now - _lastRendered;
  if (delta < 15) {
    _timerID = window.setTimeout(_runReaction, 15 - now);
  } else {
    _runReaction();
  }
}


export class ModelBoundElement extends TemplatedElement {

  get model() { return _model.get(this); }
  set model(value) { _model.set(this, value); }

  static get renderCount() { return _renderCount; }
  static get totalTime() { return performance.now() - _startTime; }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // NOTE: the observer code will need to run synchronously, so that the observer
  //       can detect which properties were used at the end of the call!
  connectedCallback() {
    const queueScheduler = new Queue(priorities.LOW);
    
    this._observer = observe(() => {
        _renderCount += 1;
        // super._doRender() reads the relevant view model properties synchronously.
        super._doRender();
    }, {
      // We dont' want to run the observer right away (to start the observation process),
      // as it is run as part of rendering anyway.
      // Note: the observed model/properties must be defined at the time of first render.
      lazy: true,
      // no scheduling, just run the reaction
      // scheduler: r => r(),

      // in this example we are using a low priority queue to schedule rendering
      // scheduler: queueScheduler,
      
      // batch reaction() calls so we can reduce frequencey to no less than 15ms intervals
      scheduler: reaction => _schedule(reaction)
      /* debugger: console.log */
    });

    // this._observer = observe(() => this._doRender(), { lazy: true });

    // Triggering the initial call to this._doRender(), thus reading observable properties for the first time.
    // NOTE: this is also necessary because the observer will not get re-triggered until the observed
    //       properties are read!!!, that is, until the "get" traps of the proxy are used!!!
    super.connectedCallback();
  }
    
  // our super._doRender() is wrapped by the observer, thus observing property access
  _doRender() {
    this._observer();
  }

  disconnectedCallback() {
    unobserve(this._observer);
  }
}
