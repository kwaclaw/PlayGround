export = BatchScheduler;

declare class BatchScheduler {
    constructor(interval: number);

    protected _runReactions(): void;

    interval: number;
    lastRendered: number;

    add(reaction: Function): void;
    delete(reaction: Function): boolean;
}

