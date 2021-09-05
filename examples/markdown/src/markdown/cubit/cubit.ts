import { Cubit } from "@vue-cubit/core";
import { MarkdownState } from ".";
import marked from "marked";
import { debounce } from "lodash";

export class MarkdownCubit extends Cubit<MarkdownState> {
  constructor() {
    super(new MarkdownState());
  }

  _changeMarkdown(markdown: string) {
    this.emit(
      this.state.copyWith({
        markdown,
        html: marked(markdown).trim(),
      })
    );
  }

  changeMarkdown = debounce(this._changeMarkdown, 200);
}
