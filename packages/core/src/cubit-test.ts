import { CubitBase } from "./cubit-base";
import { Cubit } from "./cubit";
import { CubitObserver } from "./cubit-observer";
import { Change } from "./transition";

type MaybePromise<T> = Promise<T> | T;

class Observer extends CubitObserver {
  onChanged<S>(_: CubitBase<S>, change: Change<S>) {
    actualStateStack.push(change.newState);
  }
}

const actualStateStack: unknown[] = [];

export function cubitTest<C extends Cubit<S>, S>(
  description: string,
  options: {
    setUp?(): MaybePromise<void>;
    build(): C;
    act?(cubit: C): void;
    seed?(): S;
    skip?: number;
    wait?: number;
    expect(): S[];
    verify?(cubit: C): MaybePromise<void>;
    tearDown?(): MaybePromise<void>;
  }
): void {
  test(description, async () => {
    await options.setUp?.();

    CubitBase.observer = new Observer();

    const cubit = options.build();
    if (options.seed) cubit.emit(options.seed());
    actualStateStack.length = 0;
    options.act?.(cubit);

    if (options.wait !== undefined)
      await new Promise((resolve) => setTimeout(resolve, options.wait));

    expect(actualStateStack.slice(options.skip)).toEqual(options.expect());

    await options.verify?.(cubit);

    CubitBase.observer = null;

    await options.tearDown?.();
  });
}
