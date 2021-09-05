import { Cubit } from "@vue-cubit/core";
import { ChatState } from ".";

export class ChatCubit extends Cubit<ChatState> {
  private socket?: WebSocket;

  constructor() {
    super(new ChatState({}));
  }

  open() {
    this.socket = new WebSocket("ws://localhost:8080");
    this.socket!.addEventListener("open", this.handleOpen.bind(this));
    this.socket!.addEventListener("message", this.handleMessage.bind(this));
    this.socket!.addEventListener("error", this.handleError.bind(this));
    this.socket!.addEventListener("close", this.handleClose.bind(this));
  }

  type(message: string) {
    this.emit(
      this.state.copyWith({
        message: message,
      })
    );
  }

  send() {
    this.socket?.send(this.state.message);
    this.emit(
      this.state.copyWith({
        message: "",
      })
    );
  }

  close() {
    this.socket?.close();
  }

  private handleOpen() {
    this.emit(
      this.state.copyWith({
        connecting: true,
        errorMessage: null,
      })
    );
  }

  private handleClose() {
    this.emit(
      this.state.copyWith({
        connecting: false,
      })
    );
  }

  private handleError(ev: Event) {
    this.emit(
      this.state.copyWith({
        connecting: false,
        errorMessage: typeof ev === "string" ? ev : null,
      })
    );
  }

  private handleMessage(ev: MessageEvent) {
    this.emit(
      this.state.copyWith({
        messages: this.state.messages.concat(JSON.parse(ev.data)),
      })
    );
  }
}
