<template>
  <div
    class="bzsh-tree-node"
    :class="{ 'is-expanded': node.expanded, 'is-current': isCurrent, 'is-disabled': node.disabled }"
    :style="{ paddingLeft: `${node.level * (indent || 16)}px` }"
    @click.stop="handleClick"
  >
    <div class="bzsh-tree-node__content">
      <span
        class="bzsh-tree-node__expand-icon"
        :class="{ 'is-leaf': node.isLeaf }"
        @click.stop="handleExpand"
      >
        <ArrowIcon v-if="!node.isLeaf" />
      </span>
      <span v-if="showCheckbox" class="bzsh-tree-node__checkbox" @click.stop="handleCheck">
        <input type="checkbox" :checked="node.checked" :indeterminate="node.indeterminate" />
      </span>
      <span class="bzsh-tree-node__label">
        <slot :node="node" :data="node.data">{{ node.label }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { inject } from 'vue';
import ArrowIcon from './icons/ArrowIcon.vue';
import { treeContextKey } from '../constants';
import type { FlattenTreeItem, TreeContext } from '../types';

const props = defineProps<{
  node: FlattenTreeItem<T>;
  isCurrent?: boolean;
}>();
const { node, isCurrent } = props;

const {
  props: treeProps,
  handleNodeClick,
  handleCheckChange,
  handleToggleExpand,
} = inject(treeContextKey) as TreeContext<T>;

const { indent, showCheckbox, expandOnClickNode, checkOnClickNode } = treeProps;

const handleClick = () => {
  if (node.disabled) return;
  handleNodeClick(node);
  if (expandOnClickNode) {
    handleToggleExpand(node);
  }
  if (checkOnClickNode && showCheckbox) {
    handleCheckChange(node, !node.checked);
  }
};

const handleExpand = () => {
  if (node.disabled) return;
  handleToggleExpand(node);
};

const handleCheck = () => {
  if (node.disabled) return;
  handleCheckChange(node, !node.checked);
};
</script>

<style scoped>
/* ... 样式 ... */
</style>
