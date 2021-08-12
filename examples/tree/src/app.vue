<template>
  <tree-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TreePage } from "./tree";

export default defineComponent({
  name: "App",
  components: {
    TreePage,
  },
});
</script>
