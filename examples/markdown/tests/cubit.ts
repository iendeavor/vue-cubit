import { MarkdownCubit, MarkdownState } from "../src/markdown/cubit";
import { cubitTest } from "@vue-cubit/cubit";

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
      cubit.changeMarkdown("**bold**");
    },
    wait: 300,
    expect: () => [
      new MarkdownState({
        markdown: "**bold**",
        html: "<p><strong>bold</strong></p>",
      }),
    ],
  });
});
