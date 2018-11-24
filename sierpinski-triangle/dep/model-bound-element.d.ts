
import { TemplatedElement } from './templated-element.js';
export declare class ModelBoundElement<Observable extends object> extends TemplatedElement {
    model: Observable;
    protected _observer: Function;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstRendered(): void;
    rendered(): void;
}
