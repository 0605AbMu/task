<script setup lang="ts">
import Table from "./components/table.vue";
import Tree from "./components/tree.vue";
import { TNode } from "./types/tree";
import { TColumn } from "./types/table";

//Tree configurations and data
const data: TNode[] = [
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

//Table configurations and data
const tableData = [
  {
    id: 4,
    name: "Olma",
    age: 30,
    address: "Tashkent, Chilanzar",
    tags: ["nice", "developer"],
  },
  {
    id: 5,
    name: "Olma",
    age: 30,
    address: "Tashkent, Chilanzar",
    tags: ["nice", "developer"],
  },
  {
    id: 6,
    name: "Olma",
    age: 30,
    address: "Tashkent, Chilanzar",
    tags: ["nice", "developer"],
  },
];

const onNodeClick = (item) => {
  console.log(item.value);
};

const columns: TColumn[] = [
  {
    title: "ID",
    propName: "id",
    order: 0,
  },
  {
    title: "Age",
    propName: "age",
    order: 1,
  },
  {
    title: "Address",
    propName: "address",
    order: 2,
  },
  {
    title: "Tags",
    propName: "tags",
    order: 3,
  },
  {
    title: "Action",
    propName: "action",
    order: 4,
  },
];

const onTableItemClick = (item) => {
  alert(JSON.stringify(item));
};
</script>

<template>
  <div class="app container">
    <div class="task-board">
      <h1>Tree</h1>
      <transition name="slide-fade">
        <Tree v-if="true" :nodes="data" :on-node-click="onNodeClick" />
      </transition>
    </div>
    <hr />
    <div class="task-board">
      <h1>Table</h1>
      <Transition name="bounce" mode="default">
        <Table v-if="true" :columns="columns" :data="tableData">
          <template #tags="colProps">
            <p>
              <span
                class="tag"
                type="button"
                v-for="tag in colProps.row['tags']"
              >
                {{ tag }}
              </span>
            </p>
          </template>

          <template #action="colProps">
            <p>
              <button
                class="button"
                type="button"
                @click="onTableItemClick(colProps.row)"
              >
                Alert
              </button>
            </p>
          </template>
        </Table>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.button {
  padding: 10px;
  border: none;
  background-color: #67c23a;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;
}

.tag {
  padding: 5px;
  background-color: #ecf5ff;
  color: #409eff;
  border-radius: 15px;
  margin: 0 1px;
  border: none;
}

.task-board_old {
  border: 3px dashed #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
}
</style>
