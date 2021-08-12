type _Predicate<T> = (t: T) => boolean;

export class ChangeStack<T> {
  constructor(limit: number, shouldReplay: _Predicate<T>) {
    this.limit = limit;
    this._shouldReplay = shouldReplay;
  }

  readonly _history: Change<T>[] = [];
  readonly _redos: Change<T>[] = [];
  readonly _shouldReplay: _Predicate<T>;

  limit: number;

  get canRedo(): boolean {
    return this._redos.some((c) => this._shouldReplay(c._newValue));
  }
  get canUndo(): boolean {
    return this._history.some((c) => this._shouldReplay(c._oldValue));
  }

  add(change: Change<T>): void {
    if (this.limit <= 0) return;

    this._history.push(change);
    this._redos.length = 0;

    if (this._history.length > this.limit) {
      this._history.shift();
    }
  }

  clear(): void {
    this._history.length = 0;
    this._redos.length = 0;
  }

  redo(): void {
    if (this.canRedo) {
      const change = this._redos.shift()!;
      this._history.push(change);
      return this._shouldReplay(change._newValue) ? change.redo() : this.redo();
    }
  }

  undo(): void {
    if (this.canUndo) {
      const change = this._history.pop()!;
      this._redos.unshift(change);
      return this._shouldReplay(change._oldValue) ? change.undo() : this.undo();
    }
  }
}

export class Change<T> {
  constructor(
    oldValue: T,
    newValue: T,
    redo: () => void,
    undo: (t: T) => void
  ) {
    this._oldValue = oldValue;
    this._newValue = newValue;
    this._redo = redo;
    this._undo = undo;
  }

  _oldValue: T;
  _newValue: T;
  readonly _redo: Function;
  readonly _undo: (t: T) => void;

  redo(): void {
    this._redo();
  }
  undo(): void {
    this._undo(this._oldValue);
  }
}
