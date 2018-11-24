
import { html } from 'lit-html';
import { ModelBoundElement } from './model-bound-element';
import { TriangleModel } from './triangle-model';
import './dot.js';

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
      const e = performance.now() + 1.8;
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
