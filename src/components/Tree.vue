<template>
  <div ref="containerRef" class="bzsh-tree" @scroll="handleScroll">
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
        :item-size="itemSize"
        :indent="indent"
        :show-checkbox="showCheckbox"
        :is-current="currentNodeKey === item.key"
        :highlight-current="highlightCurrent"
        :icon="icon"
        @toggle="handleToggleExpand"
        @click="handleNodeClick"
        @check="handleCheck"
      >
        <template v-if="$slots.default" #default="{ node, data }">
          <slot :node="node" :data="data" />
        </template>
      </TreeNode>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import TreeNode from './TreeNode.vue';
import type { TreeItem, FlattenTreeItem, TreeProps, TreeKey } from './types';
import { useTreeData } from './composables/use-tree-data';
import { useCheck } from './composables/use-check';
import { useFilter } from './composables/use-filter';
import { useVirtualScroll } from './composables/use-virtual-scroll';

const props = withDefaults(defineProps<TreeProps>(), {
  emptyText: 'No Data',
  height: 400,
  itemSize: 26,
  highlightCurrent: false,
  expandOnClickNode: true,
  checkOnClickNode: false,
  showCheckbox: false,
  checkStrictly: false,
  indent: 16,
  nodeKey: 'id',
});

const emit = defineEmits<{
  (e: 'node-click', data: TreeItem, node: FlattenTreeItem): void;
  (e: 'check-change', data: TreeItem, checked: boolean, indeterminate: boolean): void;
  (
    e: 'check',
    data: TreeItem,
    checkedInfo: {
      checkedNodes: TreeItem[];
      checkedKeys: TreeKey[];
      halfCheckedNodes: TreeItem[];
      halfCheckedKeys: TreeKey[];
    },
  ): void;
  (e: 'current-change', data: TreeItem, node: FlattenTreeItem): void;
  (e: 'node-expand', data: TreeItem, node: FlattenTreeItem): void;
  (e: 'node-collapse', data: TreeItem, node: FlattenTreeItem): void;
}>();

// --- Composables ---
const {
  nodeMap,
  flattenData,
  currentNodeKey,
  buildTree,
  computeVisibleData,
  expandAll,
  collapseAll,
  setData,
  toggleExpand,
} = useTreeData(props);

const {
  initCheckedState,
  toggleCheck,
  setCheckedKeys,
  setChecked,
  getCheckedNodes,
  getCheckedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
} = useCheck(props, nodeMap);

const { filter } = useFilter(props, nodeMap, computeVisibleData);

const { containerRef, totalHeight, visibleData, offset, handleScroll } = useVirtualScroll(
  props,
  flattenData,
);

// --- Watchers ---
// 监听数据源变化
watch(
  () => props.data,
  (newData) => {
    nodeMap.value.clear();
    buildTree(newData);
    initCheckedState();
    computeVisibleData();
  },
  { deep: true, immediate: true },
);

// --- 交互逻辑 ---

const handleToggleExpand = (node: FlattenTreeItem) => {
  toggleExpand(node);
  if (node.expanded) {
    emit('node-expand', node.data, node);
  } else {
    emit('node-collapse', node.data, node);
  }
};

const handleCheck = (node: FlattenTreeItem, checked: boolean) => {
  toggleCheck(node, checked);

  emit('check-change', node.data, node.checked, node.indeterminate);

  emit('check', node.data, {
    checkedNodes: getCheckedNodes(),
    checkedKeys: getCheckedKeys(),
    halfCheckedNodes: getHalfCheckedNodes(),
    halfCheckedKeys: getHalfCheckedKeys(),
  });
};

const handleNodeClick = (node: FlattenTreeItem) => {
  currentNodeKey.value = node.key;
  emit('node-click', node.data, node);
  emit('current-change', node.data, node);

  if (props.expandOnClickNode) {
    handleToggleExpand(node);
  }

  if (props.checkOnClickNode && props.showCheckbox && !node.disabled) {
    handleCheck(node, !node.checked);
  }
};

// --- 暴露 API ---
defineExpose({
  getCheckedNodes,
  getCheckedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  setCheckedKeys,
  setChecked,
  getCurrentKey: () => currentNodeKey.value,
  getCurrentNode: () => {
    if (currentNodeKey.value !== undefined) {
      return nodeMap.value.get(currentNodeKey.value)?.data;
    }
    return undefined;
  },
  setCurrentKey: (key: TreeKey) => {
    currentNodeKey.value = key;
  },
  expandAll,
  collapseAll,
  setData,
  filter,
});

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.style.height = `${props.height}px`;
  }
});
</script>

<style scoped>
.bzsh-tree {
  /* 定义 CSS 变量以便于统一管理和后续支持主题切换 */
  --bzsh-tree-bg-color: #fff;
  --bzsh-tree-text-color: #606266;
  --bzsh-tree-border-color: #e4e7ed;
  --bzsh-tree-empty-color: #909399;
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

/* 优化滚动条样式 (Webkit) */
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
