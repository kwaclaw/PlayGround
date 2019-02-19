
import { TemplatedElement } from './templated-element';
export declare class ModelBoundElement<Observable extends object> extends TemplatedElement {
    model: Observable;
    static renderCount: number;
    static totalTime: number;
    protected _observer: Function;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
