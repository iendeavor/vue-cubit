import { Cubit, CubitPlugin } from "@vue-cubit/cubit";
import { Change, ChangeStack } from "./change_stack";

export class ReplayPlugin<State> implements CubitPlugin<State> {
  install(cubit: Cubit<State>) {
    let isTrust = true;
    cubit.addListener((change) => {
      if (isTrust === false) return;

      this.changeStack.add(
        new Change(
          change.oldState,
          change.newState,
          () => {
            isTrust = false;
            cubit.emit(change.newState);
            isTrust = true;
          },
          () => {
            isTrust = false;
            cubit.emit(change.oldState);
            isTrust = true;
          }
        )
      );
    });
  }

  private changeStack: ChangeStack<State> = new ChangeStack(
    Infinity,
    this.shouldReplay
  );

  // Sets the internal `undo`/`redo` size limit.
  // By default there is no limit.
  set limit(limit: number) {
    this.changeStack.limit = limit;
  }

  undo(): void {
    this.changeStack.undo();
  }

  redo(): void {
    this.changeStack.redo();
  }

  clearHistory(): void {
    this.changeStack.clear();
  }

  // This is called at the time the state is being restored.
  // By default [shouldReplay] always returns `true`.
  shouldReplay(_: State): boolean {
    return true;
  }
}
