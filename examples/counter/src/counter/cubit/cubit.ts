import { Cubit } from "@vue-cubit/cubit";

export class CounterCubit extends Cubit<number> {
  constructor() {
    super(0);
  }

  increment() {
    this.emit(this.state + 1);
  }
}
