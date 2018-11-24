
import { TemplateResult } from 'lit-html';
export declare class TemplatedElement extends HTMLElement {
    readonly renderComplete: any;
    private _requestedRender;
    private _firstRendered;
    constructor();
    render(): TemplateResult;
    shouldRender(): boolean;
    invalidate(renderCallback?: any): Promise<any>;
    _doRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstRendered(): void;
    rendered(): void;
}
