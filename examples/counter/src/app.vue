<template>
  <counter-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CounterPage } from "./counter";

export default defineComponent({
  name: "App",
  components: {
    CounterPage,
  },
});
</script>
