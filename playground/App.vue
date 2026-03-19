<template>
  <div class="playground">
    <h2>bzsh-tree (Virtual Tree) Playground</h2>
    <div class="controls">
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <input v-model="filterText" placeholder="Filter nodes..." @input="onFilter" />
      <button @click="expandAll">Expand All</button>
      <button @click="collapseAll">Collapse All</button>
      <button @click="getChecked">Get Checked</button>
    </div>
    <div class="demo-container">
      <Tree
        ref="treeRef"
        :data="treeData"
        show-checkbox
        highlight-current
        :height="500"
        :filter-method="filterMethod"
      >
        <template #default="{ node, data }">
          <span class="custom-node"> {{ node.label }} (ID: {{ data.id }}) </span>
        </template>
      </Tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tree } from '../src/index'; // 直接引入源码进行实时预览
import type { TreeItem } from '../src/components/Tree.vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const treeRef = ref<any>(null);
const filterText = ref('');

// 生成模拟的大数据量树结构
const generateTreeData = (depth: number, breadth: number, prefix = 'Node'): TreeItem[] => {
  if (depth === 0) return [];
  return Array.from({ length: breadth }).map((_, index) => {
    const id = `${prefix}-${index + 1}`;
    return {
      id,
      label: id,
      children: generateTreeData(depth - 1, breadth, id),
    };
  });
};

// 生成一个 4 层，每层 10 个子节点的大数据树 (总计 10000+ 个节点)
const treeData = ref(generateTreeData(4, 10));

const filterMethod = (query: string, data: TreeItem) => {
  return data.label.includes(query);
};

const onFilter = () => {
  treeRef.value?.filter(filterText.value);
};

const expandAll = () => {
  treeRef.value?.expandAll();
};

const collapseAll = () => {
  treeRef.value?.collapseAll();
};

const getChecked = () => {
  console.log('Checked Keys:', treeRef.value?.getCheckedKeys());
  alert(`Checked Keys: ${treeRef.value?.getCheckedKeys().join(', ')}`);
};
</script>

<style scoped>
.playground {
  padding: 20px;
  font-family: sans-serif;
}

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.controls input {
  padding: 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}

.controls button {
  padding: 8px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #66b1ff;
}

.demo-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.custom-node {
  color: #67c23a;
  font-style: italic;
}
</style>
