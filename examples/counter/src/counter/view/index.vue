<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ counterCubit.state }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CounterCubit } from "../cubit";

export default defineComponent({
  name: "Counter",
  setup: () => {
    const counterCubit = new CounterCubit();

    return { counterCubit };
  },
});
</script>
