<template>
  <button type="button" @click="counterCubit.increment">
    count is: {{ count }}
  </button>
</template>

<script lang="ts">
import { Change } from "@vue-cubit/cubit";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { CounterCubit } from "../cubit";

export default defineComponent({
  name: "Counter",
  setup: () => {
    const counterCubit = new CounterCubit();

    const count = ref(counterCubit.state);
    onMounted(() => counterCubit.addListener(listener))
    onBeforeUnmount(() => counterCubit.removeListener(listener))
    function listener (change: Change<number>) {
      count.value = change.newState;
    }

    return { count, counterCubit };
  },
});
</script>
