
// ES6 modules with default export
import TemplatedElement from './templated-element';
import BatchScheduler from './batch-scheduler';

export = ModelBoundElement;

declare class ModelBoundElement<Observable extends object> extends TemplatedElement {
    static renderCount: number;
    static totalTime: number;

    protected _observer: Function;

    model: Observable;
    scheduler: any;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

