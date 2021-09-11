<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>

  <button @click="counterCubit.undo">Undo</button>
  <button @click="counterCubit.redo">Redo</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CounterCubit } from "../cubit";
import { HydratedPlugin } from "@vue-cubit/hydrated-plugin";
import { ReplayPlugin } from "@vue-cubit/replay-plugin";

export default defineComponent({
  name: "Counter",
  setup: () => {
    const counterCubit = new CounterCubit()
      .use(
        new HydratedPlugin("counterCubit", localStorage, {
          fromJson: JSON.parse,
          toJson: JSON.stringify,
        })
      )
      .use(new ReplayPlugin());

    return { counterCubit };
  },
});
</script>
