<template>
  <timer-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TimerPage } from "./timer";

export default defineComponent({
  name: "App",
  components: {
    TimerPage,
  },
});
</script>
