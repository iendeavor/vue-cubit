<template>
  <playground-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PlaygroundPage } from "./playground";

export default defineComponent({
  name: "App",
  components: {
    PlaygroundPage,
  },
});
</script>
