import { CounterCubit } from "../src/counter/cubit";
import { cubitTest } from "@vue-cubit/cubit";

describe("CounterCubit", () => {
  let todoCubit: CounterCubit;

  beforeEach(() => {
    todoCubit = new CounterCubit();
  });

  cubitTest<CounterCubit, number>("emits [] when nothing added", {
    build: () => todoCubit,
    expect: () => [],
  });

  cubitTest<CounterCubit, number>("emits [1] when invoke increment once", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.increment();
    },
    expect: () => [1],
  });
});
