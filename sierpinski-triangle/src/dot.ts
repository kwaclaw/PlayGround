
import { html } from 'lit-html';
import { styleMap } from './style-map';
import { ModelBoundElement } from './model-bound-element.js';
import { DotModel } from './dot-model';

export class Dot extends ModelBoundElement<DotModel> {
  render() {
    let m = this.model;
    let { x, y, size, hover } = m;
    const s = size! * 1.3;
    const style = styleMap({
      width: s + 'px',
      height: s + 'px',
      left: (x) + 'px',
      top: (y) + 'px',
      borderRadius: (s / 2) + 'px',
      lineHeight: (s) + 'px',
      background: hover ? '#ff0' : '#61dafb',
    });
    return html`
      <style>
        :host {
          position: absolute;
          background: #61dafb;
          font: normal 15px sans-serif;
          text-align: center;
          cursor: pointer;
        }
        div {
          position: absolute;
          background: #61dafb;
          font: normal 15px sans-serif;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div style="${style}" @mouseover="${() => m.enter()}" @mouseout="${() => m.leave()}">
        ${hover ? '*' : ''}<slot></slot>${hover ? '*' : ''}
      </div>
    `;
  }
}

window.customElements.define('s-dot', Dot);
