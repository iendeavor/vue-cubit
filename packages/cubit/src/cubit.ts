import { CubitBase } from ".";

export abstract class Cubit<State> extends CubitBase<State> {
  constructor(initialState: State) {
    super(initialState);
  }
}
