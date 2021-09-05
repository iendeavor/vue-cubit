import { DeepReadonly } from "ts-essentials";
import { CubitObserver, Change, CubitPlugin } from ".";
import { proxy } from "./utils";

export abstract class CubitBase<State> {
  static observer: CubitObserver | null = null;

  private stateRef: State;

  get state(): DeepReadonly<State> {
    return this.stateRef as DeepReadonly<State>;
  }

  private listeners: Set<Listener<Change<State>>> = new Set();

  constructor(initialState: State) {
    this.stateRef = initialState;
    CubitBase.observer?.onCreated(this);
  }

  emit(state: State) {
    const oldState = this.stateRef;
    this.stateRef = state;
    this.onChanged(new Change(oldState, this.stateRef));
  }

  onChanged(change: Change<State>) {
    this.listeners.forEach((listener) => listener(change));
    CubitBase.observer?.onChanged(this, change);
  }

  addListener(listener: Listener<Change<State>>) {
    this.listeners.add(listener);
  }

  removeListener(listener: Listener<Change<State>>) {
    this.listeners.delete(listener);
  }

  use<Plugin extends CubitPlugin<State>>(plugin: Plugin): this & Plugin {
    plugin.install(this);
    return proxy(this, plugin);
  }
}

type Listener<T> = (_: T) => void;
