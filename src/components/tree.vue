<script setup lang="ts">
import { withDefaults, ref, Transition } from "vue";
import { TNode, OnNodeClickType } from "../types/tree";
const props = withDefaults(
  defineProps<{
    nodes: TNode[];
    onNodeClick: OnNodeClickType;
  }>(),
  {
    nodes(props) {
      return [];
    },
    onNodeClick: () => {},
  }
);

const remakeNodes = (data: TNode[] | undefined) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((x) => {
    return {
      key: x.key,
      value: x.value,
      childs: remakeNodes(x.childs),
      hasNoChild: !(Array.isArray(x.childs) && x.childs.length > 0),
      isOpened: ref(false),
    };
  });
};

const redefinedData = ref(remakeNodes(props.nodes));

const onItemClick = (item) => {
  item.isOpened = !item.isOpened;
  return props.onNodeClick(item, redefinedData.value);
};
</script>

<template>
  <div class="tree-container">
    <div class="item" v-for="item in redefinedData" :key="item.key">
      <div @click="onItemClick(item)">
        <i
          v-if="!item.hasNoChild && !item.isOpened"
          class="bi bi-caret-right-fill"
        ></i>
        <i
          v-if="!item.hasNoChild && item.isOpened"
          class="bi bi-caret-down-fill"
        ></i>

        {{ item.key }}
      </div>
      <Transition name="slide-fade">
        <tree
          v-if="!item.hasNoChild && item.isOpened"
          :nodes="item.childs"
          @node-click="props.onNodeClick"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tree-container {
  background-color: #fff;
  color: #030303;
  font-size: large;
  left: 0;
  margin: 0 auto;
  text-align: left;
  width: calc(100% - 0.5px);

  display: flex;
  flex-direction: column;

  row-gap: 1px;
  box-sizing: border-box;

  user-select: none;
}

.item {
  padding: 2px;
  width: 100%;
  cursor: pointer;

  border: 1px solid rgba(0, 0, 0, 0.284);
}

.item:hover {
  border-left: 5px solid rgb(18, 131, 217);
  border-collapse: separate;
  background-color: #00000008;
}
</style>
