import { CubitBase } from "./cubit-base";

export abstract class Cubit<State> extends CubitBase<State> {
  constructor(initialState: State) {
    super(initialState);
  }
}
