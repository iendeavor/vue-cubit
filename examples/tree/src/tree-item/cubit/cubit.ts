import { Cubit } from "@vue-cubit/cubit";
import { TreeItemState } from ".";
import { TreeItem } from "../model";
import { DeepReadonly } from "vue";

export class TreeItemCubit extends Cubit<TreeItemState> {
  constructor(treeItem: DeepReadonly<TreeItem>) {
    super(
      new TreeItemState({ name: treeItem.name, children: treeItem.children })
    );
  }

  toggle() {
    this.emit(
      this.state.copyWith({
        open: !this.state.open,
      })
    );
  }

  changeType() {
    this.emit(
      this.state.copyWith({
        children: JSON.parse(JSON.stringify(this.state.children)).concat({
          name: "new stuff",
        }),
        open: true,
      })
    );
  }

  addChild() {
    this.emit(
      this.state.copyWith({
        children: JSON.parse(JSON.stringify(this.state.children)).concat({
          name: "new stuff",
        }),
      })
    );
  }
}
