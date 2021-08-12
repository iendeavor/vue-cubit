export class MarkdownState {
  markdown: string;
  html: string;

  constructor({
    markdown,
    html,
  }: {
    markdown?: string;
    html?: string;
  } = {}) {
    this.markdown = markdown ?? "";
    this.html = html ?? "";
  }

  copyWith({ markdown, html }: { markdown?: string; html?: string }) {
    return new MarkdownState({
      markdown: markdown ?? this.markdown,
      html: html ?? this.html,
    });
  }
}
