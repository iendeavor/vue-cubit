import { Cubit } from "@vue-cubit/core";
import { ReplayPlugin } from "../src";

class CounterCubit extends Cubit<number> {}

describe("replay-plugin", () => {
  it("can initial plugin", () => {
    expect(() =>
      new CounterCubit(0).use(new ReplayPlugin<number>())
    ).not.toThrow();
  });

  it("can not undo", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());

    expect(cubit.canUndo).toBe(false);
  });

  it("can not redo", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());

    expect(cubit.canRedo).toBe(false);
  });

  it("correctly restore state after undo", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());
    cubit.emit(1);

    cubit.undo();

    expect(cubit.state).toBe(0);
  });

  it("correctly restore state after redo", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());
    cubit.emit(1);
    cubit.undo();

    cubit.redo();

    expect(cubit.state).toBe(1);
  });

  it("can undo after emit", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());

    cubit.emit(1);

    expect(cubit.canUndo).toBe(true);
  });

  it("can redo after undo", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());
    cubit.emit(1);

    cubit.undo();

    expect(cubit.canRedo).toBe(true);
  });

  it("cannot undo when there is no history", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());
    cubit.emit(1);

    cubit.undo();

    expect(cubit.canUndo).toBe(false);
  });

  it("cannot redo after emit new state", () => {
    const cubit = new CounterCubit(0).use(new ReplayPlugin<number>());
    cubit.emit(1);
    cubit.undo();

    cubit.emit(2);

    expect(cubit.canRedo).toBe(false);
  });
});
