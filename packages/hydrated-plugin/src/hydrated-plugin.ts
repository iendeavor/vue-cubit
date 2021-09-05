import { Cubit, CubitPlugin } from "@vue-cubit/core";

export class HydratedPlugin<State> implements CubitPlugin<State> {
  private key: string;
  private fromJson: (json: string) => State;
  private toJson: (state: State) => string;
  private storage: Storage;

  constructor(
    key: string,
    storage: Storage,
    {
      fromJson = JSON.parse,
      toJson = JSON.stringify,
    }: {
      fromJson?: (json: string) => State;
      toJson?: (state: State) => string;
    } = {}
  ) {
    this.key = key;
    this.fromJson = fromJson;
    this.toJson = toJson;
    this.storage = storage;
  }

  install(cubit: Cubit<State>) {
    try {
      const item = this.storage.getItem(this.key);
      if (item !== null) {
        cubit.emit(this.fromJson(item));
      }
    } catch {}

    cubit.addListener((change) => {
      this.storage.setItem(this.key, this.toJson(change.newState));
    });
  }
}
