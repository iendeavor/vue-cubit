<template>
  <p>(You can double click on an item to turn it into a folder.)</p>

  <ul>
    <tree-item class="tree-item" :tree-item="treeData"></tree-item>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TreeItem } from "../../tree-item";

const treeData = {
  name: "My Tree",
  children: [
    { name: "hello" },
    { name: "wat" },
    {
      name: "child folder",
      children: [
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }],
        },
        { name: "hello" },
        { name: "wat" },
        {
          name: "child folder",
          children: [{ name: "hello" }, { name: "wat" }],
        },
      ],
    },
  ],
};

export default defineComponent({
  name: "TreePage",
  components: {
    TreeItem,
  },
  setup() {
    return {
      treeData,
    };
  },
});
</script>
