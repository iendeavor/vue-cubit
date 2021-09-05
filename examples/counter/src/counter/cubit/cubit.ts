import { Cubit } from "@vue-cubit/cubit";

export class CounterCubit extends Cubit<number> {
  constructor() {
    super(0);
  }

  increment() {
    this.emit(this.state + 1);
  }

  decrement() {
    this.emit(this.state - 1);
  }

  async incrementAsync() {
    await this.wait();
    this.emit(this.state + 1);
  }

  async decrementAsync() {
    await this.wait();
    this.emit(this.state - 1);
  }

  private async wait() {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
