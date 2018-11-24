import { TriangleModel } from "./triangle-model";
import { observable } from '@nx-js/observer-util/dist/es.es6.js';
export class AppModel {
    constructor(initialSize) {
        this.intervalID = setInterval(() => {
            this.sharedModel.seconds = this.sharedModel.seconds % 10 + 1;
        }, 1000);
        this.sharedModel = observable({ seconds: 0 });
        this.triangleModel = new TriangleModel(this.sharedModel, 0, 0, initialSize);
        return observable(this);
    }
    start() {
        const startTime = new Date().getTime();
        const update = () => {
            this.elapsed = new Date().getTime() - startTime;
            this.rafID = requestAnimationFrame(update);
        };
        this.rafID = requestAnimationFrame(update);
    }
    stop() {
        clearInterval(this.intervalID);
        cancelAnimationFrame(this.rafID);
    }
}
