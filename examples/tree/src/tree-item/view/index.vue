<template>
  <li>
    <div
      :class="{ bold: treeItemCubit.state.isFolder }"
      @click="treeItemCubit.toggle"
      @dblclick="treeItemCubit.changeType"
    >
      {{ treeItemCubit.state.name }}
      <span v-if="treeItemCubit.state.isFolder"
        >[{{ treeItemCubit.state.open ? "-" : "+" }}]</span
      >
    </div>
    <ul v-if="treeItemCubit.state.isFolder" v-show="treeItemCubit.state.open">
      <tree-item
        v-for="child of treeItemCubit.state.children"
        class="tree-item"
        :tree-item="child"
      />
      <li class="add" @click="treeItemCubit.addChild">+</li>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, DeepReadonly } from "vue";
import { useCubit } from "@vue-cubit/core";
import { TreeItemCubit, TreeItem } from "../cubit";

export default defineComponent({
  name: "TreeItem",
  props: {
    treeItem: {
      required: true,
      type: Object as PropType<DeepReadonly<TreeItem>>,
    },
  },
  setup(props) {
    const treeItemCubit = useCubit(() => new TreeItemCubit(props.treeItem));

    return {
      treeItemCubit,
    };
  },
});
</script>
