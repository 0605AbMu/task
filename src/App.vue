<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Table from "./components/table.vue";
import tree, { item } from "./components/tree.vue";

const data: item[] = [
  {
    key: "Fruits",
    value: 1,
    childs: [
      {
        key: "Ho'l mevalar",
        value: 2,
        childs: [
          {
            key: "Olma",
            value: 3,
          },
          {
            key: "Nok",
            value: 4,
          },
        ],
      },
      {
        key: "Potato",
        value: 3,
      },
    ],
  },

  {
    key: "Phone",
    value: 2,
    childs: [
      {
        key: "Samsung",
        value: 2,
      },
      {
        key: "Apple",
        value: 3,
      },
    ],
  },
];

const tableData = [
  {
    id: 4,
    name: "Olma",
  },
  {
    id: 6,
    name: "Behi",
  },
];

const onItemClick = (item) => {
  alert(item.value);
};

const onTableItemClick = (item) => {
  alert(JSON.stringify(item));
};
</script>

<template>
  <div class="app">
    <tree :items="data" :on-item-click="onItemClick" />
    <Table
      :columns="[
        { title: 'ID', propName: 'id', order: 2 },
        { title: 'First Name', propName: 'name', order: 1 },
      ]"
      :data="tableData"
      @item-click="onTableItemClick"
    />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
