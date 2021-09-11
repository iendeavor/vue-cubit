# Vue-cubit

Vue-cubit is a predictable state management library for Vue and heavily inspired by [BLoC](https://bloclibrary.dev/#/).

## Getting Started

For vue@3:

```sh
yarn add @vue-cubit/core
```

For vue@2 + @vue/composition-api

```sh
yarn add @vue/composition-api @vue/composition-api
```

```typescript
// ./cubit.ts

import { Cubit } from "@vue-cubit/core";

class CounterCubit extends Cubit<number> {
  constructor() {
    super(0);
  }

  increment = () => {
    this.emit(this.state + 1);
  };
}
```

```html
<!-- ./index.vue -->

<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { CounterCubit } from "./cubit";

  export default defineComponent({
    name: "Counter",
    setup: () => {
      const counterCubit = new CounterCubit();

      return { counterCubit };
    },
  });
</script>
```

## Plugins

### Replay Plugin

```sh
yarn add @vue-cubit/replay-plugin
```

```diff
<!-- ./index.vue -->

<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>
+ <button :disabled="counterCubit.canUndo === false" @click="counterCubit.undo">Undo</button>
+ <button :disabled="counterCubit.canRedo === false" @click="counterCubit.redo">Redo</button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { CounterCubit } from "../cubit";
+ import { ReplayPlugin } from "@vue-cubit/replay-plugin";

  export default defineComponent({
    name: "Counter",
    setup: () => {
-     const counterCubit = new CounterCubit();
+     const counterCubit = new CounterCubit().use(new ReplayPlugin<number>());

      return { counterCubit };
    },
  });
</script>
```

### Hydrated Plugin

```sh
yarn add @vue-cubit/hydrated-plugin
```

```diff
<!-- ./index.vue -->

<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { CounterCubit } from "../cubit";
+ import { HydratedPlugin } from "@vue-cubit/hydrated-plugin";

  export default defineComponent({
    name: "Counter",
    setup: () => {
-     const counterCubit = new CounterCubit();
+     const counterCubit = new CounterCubit().use(
+       new HydratedPlugin<number>("counterCubit", localStorage, {
+         fromJson: JSON.parse,
+         toJson: JSON.stringify,
+       })
+     );

      return { counterCubit };
    },
  });
</script>
```

## Examples

### [Counter](./examples/counter)

- Cubit's state is reactive.

- Update state with emit method inherited from cubit.

### [Markdown](./examples/markdown)

- Use state with `v-model` is fine, but DO NOT directly modify state elsewhere.

### [Todos](./examples/todos)

- Use `@vue-cubit/hydrated-plugin` to automatically persists and restores states.

- Use `@vue-cubit/replay-plugin` to adds the ability to undo and redo.
