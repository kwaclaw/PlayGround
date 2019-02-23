export = BatchScheduler;

declare class BatchScheduler {
    constructor(interval: number);

    protected _runReactions(): void;

    interval: number;
    lastRendered: number;

    schedule(reaction: Function): void;
}

