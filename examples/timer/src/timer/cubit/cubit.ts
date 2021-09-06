import { Cubit } from "@vue-cubit/core";
import { TimerState } from ".";

export class TimerCubit extends Cubit<TimerState> {
  constructor() {
    super(new TimerState());
  }

  _changeTimer(timer: string) {
    this.emit(
      this.state.copyWith({
        timer,
      })
    );
  }
}
