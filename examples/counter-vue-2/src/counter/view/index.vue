<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>
</template>

<script lang="ts">
import { CounterCubit } from "../cubit";

export default {
  name: "Counter",
  setup: () => {
    const counterCubit = new CounterCubit();

    return { counterCubit };
  },
};
</script>
