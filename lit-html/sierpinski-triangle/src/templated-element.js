import { html, render, TemplateResult } from '../node_modules/lit-html/lit-html.js';

const microtaskPromise = new Promise((resolve) => resolve(true));
const _renderPromise = new WeakMap();

export class TemplatedElement extends HTMLElement {

  get renderComplete() { return _renderPromise.get(this); }

  constructor() {
    super();
    _renderPromise.set(this, microtaskPromise);
    this.attachShadow({ mode: 'open' });
  }

  render() {
    return html``;
  }

  shouldRender() {
    return true;
  }

  async invalidate() {
    if (!this._requestedRender) {
      this._requestedRender = true;

      let resolver = null;
      const previousRenderPromise = _renderPromise.get(this);
      _renderPromise.set(this, new Promise((r) => resolver = r));
      await previousRenderPromise;

      this._doRender();

      if (resolver) {
        resolver(!this._requestedRender);
      }
    }

    return this.renderComplete;
  }

  _doRender() {
    this._requestedRender = false;

    if (this.shouldRender()) {
      const templateResult = this.render();
      if (templateResult instanceof TemplateResult) {
        render(templateResult, this.shadowRoot, { scopeName: this.localName, eventContext: this });
      }

      if (!this._firstRendered) {
        this._firstRendered = true;
        this.firstRendered();
      }

      this.rendered();
    }
  }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  connectedCallback() {
    this._firstRendered = false;
    this.invalidate();
  }

  disconnectedCallback() {
    //
  }

  firstRendered() { }

  rendered() { }
}
