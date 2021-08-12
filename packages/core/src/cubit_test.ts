import { CubitBase, Cubit, CubitObserver, Change } from ".";

class Observer extends CubitObserver {
  onChanged<S>(_: CubitBase<S>, change: Change<S>) {
    actualStateStack.push(change.newState);
  }
}

const actualStateStack: unknown[] = [];

export function cubitTest<C extends Cubit<S>, S>(
  description: string,
  options: {
    build(): C;
    act?(cubit: C): void;
    seed?(): S;
    skip?: number;
    wait?: number;
    expect(): S[];
  }
): void {
  test(description, async () => {
    CubitBase.observer = new Observer();

    const cubit = options.build();
    if (options.seed) cubit.emit(options.seed());
    actualStateStack.length = 0;
    options.act?.(cubit);

    if (options.wait !== undefined)
      await new Promise((resolve) => setTimeout(resolve, options.wait));

    expect(actualStateStack.slice(options.skip)).toEqual(options.expect());

    CubitBase.observer = null;
  });
}
