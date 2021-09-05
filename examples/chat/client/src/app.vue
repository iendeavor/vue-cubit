<template>
  <chat-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ChatPage } from "./chat";

export default defineComponent({
  name: "App",
  components: {
    ChatPage,
  },
});
</script>
