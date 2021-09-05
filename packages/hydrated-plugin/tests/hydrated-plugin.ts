import { Cubit } from "@vue-cubit/core";
import { HydratedPlugin } from "../src";

class LocalStorageMock implements Storage {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  length = 0;
  key() {
    return null;
  }
}

global.localStorage = new LocalStorageMock();

class CounterCubit extends Cubit<number> {
  constructor() {
    super(0);
  }

  increment() {
    this.emit(this.state + 1);
  }
}

describe("hydrated-plugin", () => {
  it("can initial plugin", () => {
    expect(
      () => new HydratedPlugin<number>("counter", global.localStorage)
    ).not.toThrow();
  });

  it("get item from storage after installation", () => {
    const spyGetItem = jest.spyOn(global.localStorage, "getItem");
    spyGetItem.mockReturnValue(JSON.stringify(42));

    const cubit = new CounterCubit().use(
      new HydratedPlugin<number>("counter", global.localStorage)
    );

    expect(spyGetItem).toBeCalledTimes(1);
    expect(cubit.state).toBe(42);

    spyGetItem.mockReset();
    spyGetItem.mockRestore();
  });

  it("set item to storage after emit", () => {
    const spyGetItem = jest.spyOn(global.localStorage, "getItem");
    spyGetItem.mockReturnValue(JSON.stringify(42));
    const spySetItem = jest.spyOn(global.localStorage, "setItem");

    const cubit = new CounterCubit().use(
      new HydratedPlugin<number>("counter", global.localStorage)
    );

    cubit.increment();

    expect(spySetItem).toBeCalledTimes(1);
    expect(cubit.state).toBe(43);

    spyGetItem.mockReset();
    spyGetItem.mockRestore();
  });
});
