import { CubitBase } from ".";

export interface CubitPlugin<State> {
  install(cubit: CubitBase<State>): void;
}
