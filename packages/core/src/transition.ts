export class Change<State> {
  readonly oldState: State;
  readonly newState: State;

  constructor(oldState: State, newState: State) {
    this.oldState = oldState as State;
    this.newState = newState as State;
  }
}
