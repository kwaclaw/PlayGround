import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util';

import { TemplatedElement } from './templated-element.js';

const _model = new WeakMap();

export class ModelBoundElement extends TemplatedElement {

  get model() { return _model.get(this); }
  set model(value) { _model.set(this, value); }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // NOTE: the observer code will need to run synchronously, so that the observer
  //       can detect which properties were used at the end of the call!
  connectedCallback() {
    // in this example we are using a low priority queue to schedule rendering
    const queueScheduler = new Queue(priorities.LOW);
    
    this._observer = observe(() => {
        // super._doRender() reads the relevant view model properties synchronously.
        super._doRender();
    }, {
      // We dont' want to run the observer right away (to start the observation process),
      // as it is run as part of rendering anyway.
      // Note: the observed model/properties must be defined at the time of first render.
      lazy: true,
      scheduler: queueScheduler
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
