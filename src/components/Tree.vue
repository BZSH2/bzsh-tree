<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div
    ref="containerRef"
    class="bzsh-tree"
    :style="{ height: `${height}px` }"
    @scroll="handleScroll"
  >
    <div v-if="!visibleData.length" class="bzsh-tree-empty-block">
      <slot name="empty">
        <span class="bzsh-tree-empty-text">{{ emptyText }}</span>
      </slot>
    </div>
    <div v-else class="bzsh-tree-phantom" :style="{ height: `${totalHeight}px` }" />
    <div
      v-if="visibleData.length"
      class="bzsh-tree-content"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <TreeNode
        v-for="item in visibleData"
        :key="item.key"
        :node="item"
        :is-current="currentNodeKey === item.key"
      >
        <template v-if="$slots.default" #default="{ node, data }">
          <slot :node="node" :data="data" />
        </template>
      </TreeNode>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { provide, toRefs } from 'vue';
import TreeNode from './TreeNode.vue';
import { useTree } from '../composables/use-tree';
import { useExpand } from '../composables/use-expand';
import { useCheck } from '../composables/use-check';
import { useFilter } from '../composables/use-filter';
import { useVirtualScroll } from '../composables/use-virtual-scroll';
import { treeContextKey } from '../constants';
import type { TreeKey, TreeOptionProps, FlattenTreeItem } from '../types';

const props = withDefaults(
  defineProps<{
    data?: T[];
    emptyText?: string;
    nodeKey?: string | keyof T;
    props?: TreeOptionProps<T>;
    highlightCurrent?: boolean;
    expandOnClickNode?: boolean;
    checkOnClickNode?: boolean;
    defaultExpandedKeys?: TreeKey[];
    defaultCheckedKeys?: TreeKey[];
    showCheckbox?: boolean;
    checkStrictly?: boolean;
    indent?: number;
    height?: number;
    itemSize?: number;
    filterMethod?: (query: string, data: T, node: FlattenTreeItem<T>) => boolean;
  }>(),
  {
    data: () => [],
    emptyText: 'No Data',
    nodeKey: 'id',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: () =>
      ({ value: 'id', label: 'label', children: 'children', disabled: 'disabled' }) as any,
    highlightCurrent: false,
    expandOnClickNode: true,
    checkOnClickNode: false,
    defaultExpandedKeys: () => [],
    defaultCheckedKeys: () => [],
    showCheckbox: false,
    checkStrictly: false,
    indent: 16,
    height: 400,
    itemSize: 26,
  },
);

const { emptyText, height } = toRefs(props);

const emit = defineEmits<{
  (e: 'node-click', data: T, node: FlattenTreeItem<T>): void;
  (e: 'check-change', data: T, checked: boolean, indeterminate: boolean): void;
  (
    e: 'check',
    data: T,
    checkedInfo: {
      checkedNodes: T[];
      checkedKeys: TreeKey[];
      halfCheckedNodes: T[];
      halfCheckedKeys: TreeKey[];
    },
  ): void;
  (e: 'current-change', data: T, node: FlattenTreeItem<T>): void;
  (e: 'node-expand', data: T, node: FlattenTreeItem<T>): void;
  (e: 'node-collapse', data: T, node: FlattenTreeItem<T>): void;
}>();

const {
  nodeMap,
  flattenData,
  currentNodeKey,
  handleNodeClick,
  expandAll,
  collapseAll,
  computeVisibleData,
  getCurrentKey,
  getCurrentNode,
  setCurrentKey,
} = useTree(props, emit);

const { handleToggleExpand } = useExpand(props, emit, { computeVisibleData });
const {
  getCheckedNodes,
  getCheckedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  handleCheckChange,
  setChecked,
  setCheckedKeys,
} = useCheck(props, emit, nodeMap);

const { filter } = useFilter(props, nodeMap, computeVisibleData);

const { containerRef, totalHeight, visibleData, offset, handleScroll } = useVirtualScroll(
  props,
  flattenData,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
provide(treeContextKey as any, {
  props,
  handleNodeClick,
  handleCheckChange,
  handleToggleExpand,
});

defineExpose({
  getCheckedNodes,
  getCheckedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  setChecked,
  setCheckedKeys,
  getCurrentKey,
  getCurrentNode,
  setCurrentKey,
  expandAll,
  collapseAll,
  filter,
});
</script>

<style scoped>
/* ... 样式保持不变 ... */
.bzsh-tree {
  --bzsh-tree-bg-color: var(--el-bg-color-overlay, #fff);
  --bzsh-tree-text-color: var(--el-text-color-primary, #606266);
  --bzsh-tree-border-color: var(--el-border-color-light, #e4e7ed);
  --bzsh-tree-empty-color: var(--el-text-color-secondary, #909399);
  --bzsh-tree-scrollbar-thumb: #dcdfe6;
  --bzsh-tree-scrollbar-thumb-hover: #c0c4cc;

  font-family: var(
    --el-font-family,
    'Helvetica Neue',
    Helvetica,
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    '微软雅黑',
    Arial,
    sans-serif
  );
  overflow-y: auto;
  position: relative;
  width: 100%;
  border: 1px solid var(--bzsh-tree-border-color);
  border-radius: 4px;
  background-color: var(--bzsh-tree-bg-color);
  color: var(--bzsh-tree-text-color);
  box-sizing: border-box;
}

.bzsh-tree::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.bzsh-tree::-webkit-scrollbar-track {
  background: transparent;
}

.bzsh-tree::-webkit-scrollbar-thumb {
  background: var(--bzsh-tree-scrollbar-thumb);
  border-radius: 3px;
}

.bzsh-tree::-webkit-scrollbar-thumb:hover {
  background: var(--bzsh-tree-scrollbar-thumb-hover);
}

.bzsh-tree-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.bzsh-tree-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.bzsh-tree-empty-block {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  height: 100%;
}

.bzsh-tree-empty-text {
  color: var(--bzsh-tree-empty-color);
  font-size: 14px;
}
</style>
