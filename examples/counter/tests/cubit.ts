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

  cubitTest<CounterCubit, number>("emits [1] when invoke increment", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.increment();
    },
    expect: () => [1],
  });

  cubitTest<CounterCubit, number>("emits [-1] when invoke decrement", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.decrement();
    },
    expect: () => [-1],
  });

  cubitTest<CounterCubit, number>("emits [1] when invoke incrementAsync", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.incrementAsync();
    },
    wait: 600,
    expect: () => [1],
  });

  cubitTest<CounterCubit, number>("emits [-1] when invoke decrementAsync", {
    build: () => todoCubit,
    act: (cubit) => {
      cubit.decrementAsync();
    },
    wait: 600,
    expect: () => [-1],
  });
});
