
import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
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
    //TODO investigate the Queue scheduler for nx-js
    // We currently use a scheduler that *IS* the invalidate() function with the observer as argument,
    // this only works because invalidate() takes an (optional) doRender() equivalent as an argument.
    // We do this because we want to use invalidate() while at the same time have the observer run synchronously.
    this._observer = observe(() => {
        // this._doRender() reads the relevant view model properties syncronously.
        this._doRender();
    }, {
      // Sometimes we dont' want to run the observer right away (to start the observation process)
      // because the observed model/properties might still be undefined at this time.
      //lazy: true,
      scheduler: this.invalidate.bind(this)
      /* debugger: console.log */
    });

    // this._observer = observe(() => this._doRender(), { lazy: true });
    super.connectedCallback();
  }

  disconnectedCallback() {
    unobserve(this._observer);
  }

  firstRendered() {
    // This starts the observation process, assuming we have the lazy option turned on.
    //this._observer();
  }

  rendered() { }
}
