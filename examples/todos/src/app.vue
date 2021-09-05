<template>
  <todo-page></todo-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TodoPage } from "./todo";

export default defineComponent({
  name: "App",
  components: {
    TodoPage,
  },
});
</script>
