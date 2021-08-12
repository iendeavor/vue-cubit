<template>
  <markdown-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MarkdownPage } from "./markdown";

export default defineComponent({
  name: "App",
  components: {
    MarkdownPage,
  },
});
</script>
