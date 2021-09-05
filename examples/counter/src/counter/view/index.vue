<template>
  <div>count is: {{ counterCubit.state }}</div>
  <button type="button" @click="counterCubit.increment">Increment</button>
  <button type="button" @click="counterCubit.decrement">Decrement</button>
  <button type="button" @click="counterCubit.incrementAsync">
    Increment async
  </button>
  <button type="button" @click="counterCubit.decrementAsync">
    Decrement async
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
