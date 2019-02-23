
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { AppModel } from './app-model';
import { Queue, priorities } from '@nx-js/queue-util';

// ES6 modules with default export
import ModelBoundElement from './model-bound-element';
import BatchScheduler from './batch-scheduler';

import './triangle';

const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

class DemoScheduler extends BatchScheduler {
  constructor(interval: number) {
    super(interval);
    this._startTime = performance.now();
    this._renderCount = 0;
  }

  private _startTime: number;
  private _renderCount: number;

  get renderCount() { return this._renderCount; }
  get totalTime() { return performance.now() - this._startTime; }

  _runReactions(): void {
    super._runReactions();
    this._renderCount += 1;
  }
}

export class TriangleApplication extends ModelBoundElement<AppModel> {
  constructor() {
    super();
    this.model = new AppModel(1000);

    // here we batch up render requests to run at most every 16 milliseconds;
    // highest frequency depends on mimimum delay for window.setTimeout()
    this.scheduler = new DemoScheduler(16);

    // here we are using a low priority queue to schedule rendering
    // this.scheduler = new Queue(priorities.LOW);
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

    const rendersPerSecond = this.scheduler.renderCount * 1000 / this.scheduler.totalTime;

    return html`
      <div>
        <span>Render events per second: ${rendersPerSecond.toFixed(2)}</span>
      </div>
      <div style="${style}">
        <div>
          <s-triangle .model="${triangleModel}" .scheduler="${this.scheduler}"></s-triangle>
        </div>
      </div>
    `;
  }
}

window.customElements.define('triangle-application', TriangleApplication);
