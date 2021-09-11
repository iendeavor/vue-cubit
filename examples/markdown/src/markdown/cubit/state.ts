import marked from "marked";

export class MarkdownState {
  markdown = "";

  get html() {
    return marked(this.markdown).trim();
  }
}
