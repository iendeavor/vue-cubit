<template>
  <div id="editor">
    <textarea v-model="cubit.state.markdown"></textarea>
    <div v-html="cubit.state.html"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MarkdownCubit } from "../cubit";

export default defineComponent({
  name: "Markdown",
  setup: () => {
    const cubit = new MarkdownCubit();

    return { cubit };
  },
});
</script>

<style>
html,
body,
#editor {
  margin: 0;
  height: 100vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  overflow: auto;
  width: 50%;
  height: 100vh;
  vertical-align: top;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
