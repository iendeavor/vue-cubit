import { Cubit } from "@vue-cubit/core";
import { MarkdownState } from ".";

export class MarkdownCubit extends Cubit<MarkdownState> {
  constructor() {
    super(new MarkdownState());
  }
}
