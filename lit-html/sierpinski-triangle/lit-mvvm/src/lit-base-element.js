import { html, render, TemplateResult } from 'lit-html';

export default class LitBaseElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    return html``;
  }

  shouldRender() {
    return true;
  }

  _doRender() {
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

  connectedCallback() {
    this._firstRendered = false;
    this._doRender();
  }

  disconnectedCallback() {
    //
  }

  firstRendered() { }

  rendered() { }
}
