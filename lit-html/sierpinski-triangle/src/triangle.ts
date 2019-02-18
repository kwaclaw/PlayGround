
import { html } from '../node_modules/lit-html/lit-html.js';
import { ModelBoundElement } from './model-bound-element.js';
import { TriangleModel } from './triangle-model.js';
import './dot.js';

//TODO if we want the dots to be rendered early we need a different way to build the tree structure,
// because currently they are eligible for rendering only once the whole tree is built

export class SierpinskiTriangle extends ModelBoundElement<TriangleModel> {
  render() {
    let m = this.model;
    if (m.dot) {
      return html`
        <s-dot .model="${m.dot}">
          ${m.sharedModel.seconds}
        </s-dot>
      `;
    }

    const slowDown = true;
    if (slowDown) {
      const e = performance.now() + 0.8;
      while (performance.now() < e) {
        // Artificially long execution time.
      }
    }

    return html`
      <s-triangle .model="${m.middle}"></s-triangle>
      <s-triangle .model="${m.left}"></s-triangle>
      <s-triangle .model="${m.right}"></s-triangle>
    `;
  }
}

window.customElements.define('s-triangle', SierpinskiTriangle);
