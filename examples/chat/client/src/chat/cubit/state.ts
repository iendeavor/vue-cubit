import { DeepReadonly } from "vue";

export class ChatState {
  connecting: boolean;
  message: string;
  messages: DeepReadonly<string[]>;
  errorMessage?: string | null;

  constructor({
    connecting,
    message,
    messages,
    errorMessage,
  }: {
    connecting?: boolean;
    message?: string;
    messages?: DeepReadonly<string[]>;
    errorMessage?: string | null;
  }) {
    this.connecting = connecting ?? false;
    this.message = message ?? "";
    this.messages = messages ?? [];
    this.errorMessage = errorMessage ?? null;
  }

  copyWith({
    connecting,
    message,
    messages,
    errorMessage,
  }: {
    connecting?: boolean;
    message?: string;
    messages?: DeepReadonly<string[]>;
    errorMessage?: string | null;
  }) {
    return new ChatState({
      connecting: connecting ?? this.connecting,
      message: message ?? this.message,
      messages: messages ?? JSON.parse(JSON.stringify(this.messages)),
      errorMessage: errorMessage ?? this.errorMessage,
    });
  }
}
