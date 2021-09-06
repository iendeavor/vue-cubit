export class TimerState {
  timer: string;
  html: string;

  constructor({
    timer,
    html,
  }: {
    timer?: string;
    html?: string;
  } = {}) {
    this.timer = timer ?? "";
    this.html = html ?? "";
  }

  copyWith({ timer, html }: { timer?: string; html?: string }) {
    return new TimerState({
      timer: timer ?? this.timer,
      html: html ?? this.html,
    });
  }
}
