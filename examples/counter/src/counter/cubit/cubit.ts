import { Cubit } from "@vue-cubit/core";

export class CounterCubit extends Cubit<number> {
  constructor() {
    super(0);
  }

  increment() {
    this.emit(this.state + 1);
  }
}
