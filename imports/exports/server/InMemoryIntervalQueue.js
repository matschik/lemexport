export default class InMemoryIntervalQueue {
  intervalDuration = 1000;
  onId;
  ids = new Set();
  intervalIds = new Set();

  constructor(onId, { intervalDuration } = {}) {
    if (!onId) throw new Error("onId is required");

    this.onId = onId;
    if (intervalDuration) {
      this.intervalDuration = intervalDuration;
    }
  }

  add(...ids) {
    for (const id of ids) {
      if (this.ids.has(id)) continue;
      this.onId(id);

      const intervalId = setInterval(() => {
        const isFinished = this.onId(id);
        if (isFinished) {
          clearInterval(intervalId);
          this.intervalIds.delete(intervalId);
          this.ids.delete(id);
        }
        return isFinished;
      }, this.intervalDuration);
      this.intervalIds.add(intervalId);
    }
  }

  clear() {
    for (const intervalId of [...this.intervalIds]) {
      clearInterval(intervalId);
    }
  }
}
