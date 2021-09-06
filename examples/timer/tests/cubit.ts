import { TimerCubit, TimerState, TimerStatus } from "../src/timer/cubit";
import { cubitTest } from "@vue-cubit/core";

describe("TimerCubit", () => {
  let timerCubit: TimerCubit;

  beforeEach(() => {
    jest.useFakeTimers();
    timerCubit = new TimerCubit();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  cubitTest<TimerCubit, TimerState>("emits [] when nothing added", {
    build: () => timerCubit,
    expect: () => [],
  });

  cubitTest<TimerCubit, TimerState>(
    "emits InProgress 3 times after timer started",
    {
      build: () => timerCubit,
      act: (cubit) => {
        cubit.start();
        cubit.tick();
        cubit.tick();
        cubit.tick();
      },
      seed: () => new TimerState(3),
      wait: 3100,
      expect: () => [
        new TimerState({
          status: TimerStatus.inProgress,
          duration: 3,
        }),
        new TimerState({
          status: TimerStatus.inProgress,
          duration: 2,
        }),
        new TimerState({
          status: TimerStatus.inProgress,
          duration: 1,
        }),
      ],
    }
  );

  cubitTest<TimerCubit, TimerState>(
    "emits paused status when ticker is paused",
    {
      build: () => timerCubit,
      seed: () => new TimerState(2, TimerStatus.inProgress),
      act: (cubit) => {
        cubit.pause();
      },
      expect: () => [
        new TimerState({
          duration: 2,
          status: TimerStatus.paused,
        }),
      ],
    }
  );

  cubitTest<TimerCubit, TimerState>(
    "emits completed status when timer tick to 0",
    {
      build: () => timerCubit,
      seed: () => new TimerState(1),
      act: (cubit) => {
        cubit.tick();
      },
      wait: 1100,
      expect: () => [
        new TimerState({
          status: TimerStatus.completed,
        }),
      ],
    }
  );
});
