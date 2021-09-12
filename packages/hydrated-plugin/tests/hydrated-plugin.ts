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
    this.store[key] = value;
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
  let spyGetItem: jest.SpyInstance;
  let spySetItem: jest.SpyInstance;

  beforeEach(() => {
    spyGetItem = jest.spyOn(global.localStorage, "getItem");
    spyGetItem.mockReturnValue(JSON.stringify(42));

    spySetItem = jest.spyOn(global.localStorage, "setItem");
  });

  afterEach(() => {
    spyGetItem.mockReset();
    spyGetItem.mockRestore();

    spySetItem.mockReset();
    spySetItem.mockRestore();
  });

  it("can initial plugin", () => {
    expect(
      () => new HydratedPlugin<number>("counter", global.localStorage)
    ).not.toThrow();
  });

  it("should get item from storage after installation", () => {
    const cubit = new CounterCubit().use(
      new HydratedPlugin<number>("counter", global.localStorage)
    );

    expect(spyGetItem).toBeCalledTimes(1);
    expect(cubit.state).toBe(42);
  });

  it("should set item to storage after emit", () => {
    const cubit = new CounterCubit().use(
      new HydratedPlugin<number>("counter", global.localStorage)
    );

    cubit.increment();

    expect(spySetItem).toBeCalledTimes(1);
    expect(spySetItem).toBeCalledWith("counter", "43");
  });
});
