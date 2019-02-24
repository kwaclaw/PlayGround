export = BatchScheduler;

declare class BatchScheduler {
  constructor(interval: number);

  protected _runReactions(): number;
  protected readonly reactions: Set<Function>;

  readonly interval: number;
  readonly lastRendered: number;

  add(reaction: Function): void;
  delete(reaction: Function): boolean;
}
