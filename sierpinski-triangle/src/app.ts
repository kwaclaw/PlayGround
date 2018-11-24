
import { html } from 'lit-html';
import { styleMap } from './style-map';
import { ModelBoundElement } from './model-bound-element';
import { AppModel } from './app-model';

import './triangle.js';

const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

export class TriangleApplication extends ModelBoundElement<AppModel> {
  constructor() {
    super();
    this.model = new AppModel(1000);
  }

  connectedCallback() {
    super.connectedCallback();
    this.model.start();
  }

  disconnectedCallback() {
    this.model.stop();
    super.disconnectedCallback();
  }

  render() {
    let { elapsed, triangleModel } = this.model;

    const t = (elapsed! / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
    const style = styleMap({ ...containerStyle, transform });
    return html`
      <div style="${style}">
        <div>
          <s-triangle .model="${triangleModel}"></s-triangle>
        </div>
      </div>
    `;
  }
}

window.customElements.define('triangle-application', TriangleApplication);
