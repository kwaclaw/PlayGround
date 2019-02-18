
import { TemplateResult } from 'lit-html';
export declare class TemplatedElement extends HTMLElement {
    private _firstRendered;
    constructor();
    render(): TemplateResult;
    shouldRender(): boolean;
    _doRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstRendered(): void;
    rendered(): void;
}
