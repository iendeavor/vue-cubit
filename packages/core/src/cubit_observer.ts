import { CubitBase, Change } from ".";

export abstract class CubitObserver {
  onCreated(_: CubitBase<any>): void {}

  onChanged(_: CubitBase<any>, __: Change<any>): void {}
}
