<script setup lang="ts">
import { defineProps, withDefaults, ref, computed } from "vue";

export type TColumn = {
  propName: string | null;
  title: string;
  order?: number;
  [key: string]: any;
};

export type OnTableRowClickType = (item, items) => Promise<void> | void;

const props = withDefaults(
  defineProps<{
    columns: TColumn[];
    data: any[];
    onRowClick: OnTableRowClickType;
  }>(),
  {
    columns: () => [],
    data: () => [],
    onRowClick: () => {},
  }
);

const colsWithOrder = computed(() =>
  props.columns.sort((col, next) => (col.order ?? 0) - (next.order ?? 0))
);

const resolveData = (data) => {
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
    <tr class="row" v-for="item in data" @click="onRowClick(item, data)">
      <td v-for="col in colsWithOrder">
        <slot :name="col.propName" :row="item">
          {{ col.propName ? resolveData(item[col.propName]) : "" }}
        </slot>
      </td>
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

.row {
  border: none;
}

.row:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.08);
}

.row {
  padding: 2px;
  cursor: pointer;
  border: 1px solid #00000017;
}
.row:hover {
  background-color: rgba(70, 183, 252, 0.212);
}

.row > td {
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
