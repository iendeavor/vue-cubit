import { ref, Ref } from "vue-demi";
import { CubitObserver } from "./cubit-observer";
import { Change } from "./transition";
import { CubitPlugin } from "./cubit-plugin";
import { proxy } from "./utils";

export abstract class CubitBase<State> {
  static observer: CubitObserver | null = null;

  private state: Ref<State>;

  private listeners: Set<Listener<Change<State>>> = new Set();

  constructor(initialState: State) {
    this.state = ref(initialState) as Ref<State>;
    CubitBase.observer?.onCreated(this);
  }

  emit(state: State) {
    const oldState = this.state.value;
    this.state.value = state;
    this.onChanged(new Change(oldState, this.state.value));
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
