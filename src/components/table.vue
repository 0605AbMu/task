<script setup lang="ts">
import { defineProps, withDefaults, ref, computed } from "vue";
export type TColumn = {
  propName: string;
  title: string;
  order?: number;
  [key: string]: any;
};

export type OnTableItemClickType = (item, items) => Promise<void> | void;

const props = withDefaults(
  defineProps<{
    columns: TColumn[];
    data: any[];
    onItemClick: OnTableItemClickType;
  }>(),
  {
    columns: () => [],
    data: () => [],
    onItemClick: () => {},
  }
);

const colsWithOrder = computed(() =>
  props.columns.sort((col, next) => (col.order ?? 0) - (next.order ?? 0))
);

const resoleData = (data) => {
  if (typeof data === "function") {
    const result = data();
    return result;
  } else {
    return data.toString();
  }
};
</script>

<template>
  <table cellspacing="1" cellpadding="0">
    <tr class="header">
      <th v-for="col in colsWithOrder">{{ col.title }}</th>
    </tr>
    <tr class="item" v-for="item in data" @click="onItemClick(item, data)">
      <td v-for="col in colsWithOrder">{{ resoleData(item[col.propName]) }}</td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  background-color: #fff;
  overflow-x: auto;
}

tr {
  border: 5px solid black;
}

.item {
  border: none;
}

.item:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.08);
}

.item {
  padding: 2px;
  cursor: pointer;
  border: 1px solid #00000017;
}
.item:hover {
  background-color: rgba(70, 183, 252, 0.212);
}

.item > td {
  padding: 10px;
}

.header > th {
  border: none;
  background-color: rgb(19, 84, 205);
  color: #f1f1f1;
  padding: 10px;
  cursor: pointer;
  user-select: none;
}
</style>
