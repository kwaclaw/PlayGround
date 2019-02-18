import { TriangleModel } from "./triangle-model.js";
import { observable } from '../node_modules/@nx-js/observer-util/dist/es.es6.js';

export class AppModel {
    constructor(initialSize: number) {
        this.intervalID = setInterval(() => {
            this.sharedModel.seconds = this.sharedModel.seconds % 10 + 1;
        }, 1000);

        this.sharedModel = observable({ seconds: 0 });

        this.triangleModel = new TriangleModel(this.sharedModel, 0, 0, initialSize);
        
        return observable(this);
    }

    elapsed?: number;
    sharedModel: { seconds: number };
    triangleModel: TriangleModel;

    private intervalID?: number;
    private rafID?: number;

    start() {
        const startTime = new Date().getTime();
        const update = () => {
            this.elapsed = new Date().getTime() - startTime;
            this.rafID = requestAnimationFrame(update);
        }
        this.rafID = requestAnimationFrame(update);
    }

    stop() {
        clearInterval(this.intervalID);
        cancelAnimationFrame(this.rafID!);
    }
}