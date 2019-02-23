
const _interval = new WeakMap();
const _lastRendered = new WeakMap();
const _timerID = new WeakMap();
const _reactions = new WeakMap();

// try to run at most every 'interval' milliseconds
export default class BatchScheduler {
  constructor(interval) {
    _interval.set(this, interval);
    _reactions.set(this, new Set());
  }

  get interval() { return _interval.get(this); }
  get lastRendered() { return _lastRendered.get(this); }

  // pseudo private, should not normally be called directly
  _runReactions() {
    const reactions = _reactions.get(this);
    reactions.forEach((reaction) => {
      try { reaction(); } catch (e) { }
    });
    _timerID.set(this, null);
    _lastRendered.set(this, performance.now());
    reactions.clear();
  }

  schedule(reaction) {
    const reactions = _reactions.get(this);
    reactions.add(reaction);
    if (_timerID.get(this)) {
      return;
    }

    const now = performance.now();
    const delta = now - this.lastRendered;
    if (delta < this.interval) {
      _timerID.set(this, window.setTimeout(() => this._runReactions(), this.interval - delta));
    } else {
      this._runReactions(this);
    }
  }
}
