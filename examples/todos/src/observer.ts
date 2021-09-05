import { CubitBase, CubitObserver, Change } from "@vue-cubit/cubit";

class Observer extends CubitObserver {
  onCreated(cubit: CubitBase<unknown>) {
    console.log(cubit.state);
  }

  onChanged(cubit: CubitBase<unknown>, change: Change<unknown>) {
    console.log(cubit.state);
  }
}
CubitBase.observer = new Observer();
