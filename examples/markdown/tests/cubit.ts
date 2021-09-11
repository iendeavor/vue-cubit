import { MarkdownCubit, MarkdownState } from "../src/markdown/cubit";
import { cubitTest } from "@vue-cubit/core";

describe("MarkdownCubit", () => {
  let markdownCubit: MarkdownCubit;

  beforeEach(() => {
    markdownCubit = new MarkdownCubit();
  });

  cubitTest<MarkdownCubit, MarkdownState>("emits [] when nothing added", {
    build: () => markdownCubit,
    expect: () => [],
  });

  cubitTest<MarkdownCubit, MarkdownState>("marked", {
    build: () => markdownCubit,
    act: (cubit) => {
      cubit.state.markdown = "**bold**";
    },
    expect: () => [],
    verify: (cubit) => {
      expect(cubit.state.html).toBe("<p><strong>bold</strong></p>");
    },
  });
});
