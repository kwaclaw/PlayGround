
const _interval = new WeakMap();
const _lastRendered = new WeakMap();
const _timerID = new WeakMap();
const _reactions = new WeakMap();

// Scheduler for use with @nx-js/observer-util.
// Runs at most every 'interval' milliseconds.
export default class BatchScheduler {
  constructor(interval) {
    _interval.set(this, interval);
    _reactions.set(this, new Set());
  }

  get interval() { return _interval.get(this); }
  get lastRendered() { return _lastRendered.get(this); }
  get reactions() { return _reactions.get(this); }

  // pseudo private, should not normally be called directly;
  // returns number of reactions run
  _runReactions() {
    const reactions = this.reactions;
    reactions.forEach((reaction) => {
      try { reaction(); } catch (e) { }
    });
    const count = reactions.size;
    reactions.clear();

    _timerID.set(this, null);
    _lastRendered.set(this, performance.now());
    return count;
  }

  add(reaction) {
    const reactions = this.reactions;
    const firstInLongTime = reactions.count === 0;

    this.reactions.add(reaction);
    if (!firstInLongTime && _timerID.get(this)) {
      return;
    }

    const delta = firstInLongTime ? 0 : performance.now() - this.lastRendered;
    if (delta < this.interval) {
      _timerID.set(this, setTimeout(() => this._runReactions(), this.interval - delta));
    } else {
      this._runReactions();
    }
  }

  delete(reaction) {
    return this.reactions.delete(reaction);
  }
}
