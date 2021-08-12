import { DeepReadonly } from "vue";
import { TreeItem } from ".";

export class TreeItemState {
  open: boolean;
  name: string;
  children: DeepReadonly<TreeItem[]>;
  get isFolder() {
    return this.children.length > 0;
  }

  constructor({
    name,
    children,
    open,
  }: {
    name: string;
    children?: DeepReadonly<TreeItem[]>;
    open?: boolean;
  }) {
    this.name = name;
    this.open = open ?? false;
    this.children = children?.map((child) => child) ?? [];
  }

  copyWith({
    name,
    open,
    children,
  }: {
    name?: string;
    open?: boolean;
    children?: DeepReadonly<TreeItem[]>;
  }) {
    return new TreeItemState({
      name: name ?? this.name,
      children: children ?? this.children,
      open: open ?? this.open,
    });
  }
}
