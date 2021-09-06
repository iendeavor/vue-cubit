<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>
</template>

<script lang="ts">
import { CounterCubit } from "../cubit";
import { useCubit } from "@vue-cubit/hook";

export default {
  name: "Counter",
  setup: () => {
    const counterCubit = useCubit(() => new CounterCubit());

    return { counterCubit };
  },
};
</script>
