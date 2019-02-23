
import { TemplateResult } from 'lit-html';

export = TemplatedElement;

declare class TemplatedElement extends HTMLElement {
    private _firstRendered;
    constructor();
    protected _doRender(): void;

    render(): TemplateResult;
    shouldRender(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstRendered(): void;
    rendered(): void;
}

