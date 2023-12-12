<script setup lang="ts">
import { defineProps, withDefaults, ref } from "vue";
export type item = {
  key: string;
  value: any;
  childs?: item[];
};

export type OnItemClickType = (item, items) => Promise<void> | void;

const props = withDefaults(
  defineProps<{
    items: item[];
    onItemClick: OnItemClickType;
  }>(),
  {
    items(props) {
      return [];
    },
    onItemClick: () => {},
  }
);

const remakeItems = (data: item[] | undefined) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((x) => {
    return {
      key: x.key,
      value: x.value,
      childs: remakeItems(x.childs),
      hasNoChild: !(Array.isArray(x.childs) && x.childs.length > 0),
      isOpened: ref(false),
    };
  });
};

const redefinedData = ref(remakeItems(props.items));

const onItemClick = (item) => {
  item.isOpened = !item.isOpened;
  return props.onItemClick(item, redefinedData.value);
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
      <tree
        v-if="!item.hasNoChild && item.isOpened"
        :items="item.childs"
        @item-click="props.onItemClick"
      />
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

  width: calc(100% - 4px);

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
