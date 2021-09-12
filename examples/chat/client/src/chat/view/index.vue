<template>
  <button
    :disabled="chatCubit.state.connecting"
    type="button"
    title="Open WebSocket connection"
    @click="chatCubit.open"
  >
    Open WebSocket connection
  </button>

  <button
    :disabled="chatCubit.state.connecting === false"
    type="button"
    title="Close WebSocket connection"
    @click="chatCubit.close"
  >
    Close WebSocket connection
  </button>

  <template v-if="chatCubit.state.connecting">
    <pre style="height: 400px; overflow: scroll">{{
      chatCubit.state.messages.join("\n")
    }}</pre>

    <form @submit.stop.prevent="chatCubit.send">
      <input :value="chatCubit.state.message" @input="handleInput" />
      <button type="submit">Send</button>
    </form>
  </template>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { ChatCubit } from "../cubit";

export default defineComponent({
  name: "Chat",
  setup: () => {
    const chatCubit = new ChatCubit();

    const handleInput = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) chatCubit.type(target.value);
    };

    onBeforeUnmount(() => {
      chatCubit.close();
    });

    return { chatCubit, handleInput };
  },
});
</script>
