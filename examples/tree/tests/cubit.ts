import { TreeItemCubit, TreeItemState } from "../src/tree-item/cubit";
import { cubitTest } from "@vue-cubit/core";

describe("TreeItemCubit", () => {
  let cubit: TreeItemCubit;

  beforeEach(() => {
    cubit = new TreeItemCubit({ name: "foo" });
  });

  cubitTest<TreeItemCubit, TreeItemState>("emits [] when nothing added", {
    build: () => cubit,
    expect: () => [],
  });

  cubitTest<TreeItemCubit, TreeItemState>("convert to directory", {
    build: () => cubit,
    act: (cubit) => {
      cubit.changeType();
    },
    expect: () => [
      new TreeItemState({
        name: "foo",
        children: [{ name: "new stuff" }],
        open: true,
      }),
    ],
    verify: (cubit) => {
      expect(cubit.state.isFolder).toBe(true);
    },
  });

  cubitTest<TreeItemCubit, TreeItemState>("open directory", {
    build: () => cubit,
    act: (cubit) => {
      cubit.toggle();
    },
    expect: () => [
      new TreeItemState({ name: "foo", children: [], open: true }),
    ],
  });

  cubitTest<TreeItemCubit, TreeItemState>("add child", {
    build: () => cubit,
    act: (cubit) => {
      cubit.addChild();
    },
    expect: () => [
      new TreeItemState({
        name: "foo",
        children: [{ name: "new stuff" }],
        open: false,
      }),
    ],
  });
});
