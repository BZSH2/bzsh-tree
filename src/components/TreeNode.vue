<template>
  <div
    class="bzsh-tree-node"
    :class="[
      {
        'is-disabled': node.disabled,
        'is-current': isCurrent,
        'is-highlight': highlightCurrent && isCurrent,
        'is-checkable': showCheckbox,
      },
    ]"
    :style="{ height: `${itemSize}px` }"
    @click.stop="handleClick"
  >
    <!-- 缩进层级占位 (Indentation) -->
    <div class="bzsh-tree-node-indent" :style="{ width: `${node.level * indent}px` }">
      <span
        v-for="i in node.level"
        :key="i"
        class="bzsh-tree-indent-line"
        :style="{ left: `${(i - 1) * indent + indent / 2}px` }"
      />
    </div>

    <!-- 展开/折叠图标 (Expand/Collapse Icon) -->
    <span
      class="bzsh-tree-node-icon"
      :class="{
        'is-expanded': node.expanded,
        'is-leaf': node.isLeaf,
      }"
      @click.stop="handleToggle"
    >
      <component :is="icon" v-if="icon && !node.isLeaf" />
      <ArrowIcon v-else-if="!node.isLeaf" />
      <!-- 叶子节点占位，或者也可以显示不同的图标 -->
    </span>

    <!-- 复选框 (Checkbox) -->
    <div v-if="showCheckbox" class="bzsh-tree-node-checkbox-wrapper" @click.stop>
      <!-- eslint-disable-next-line vue/html-self-closing -->
      <input
        type="checkbox"
        class="bzsh-tree-node-checkbox"
        :checked="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="node.disabled"
        @change="handleCheckChange"
      />
    </div>

    <!-- 节点文本 (Node Content) -->
    <div class="bzsh-tree-node-content">
      <slot :node="node" :data="node.data">
        <span class="bzsh-tree-node-label">{{ node.label }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TreeNode 组件
 * 负责渲染单个树节点，处理点击、展开/收起、勾选等交互。
 */
import type { FlattenTreeItem } from './types';
import ArrowIcon from './icons/ArrowIcon.vue';

const props = defineProps<{
  /** 扁平化的节点对象 */
  node: FlattenTreeItem;
  /** 节点高度 */
  itemSize: number;
  /** 缩进大小 */
  indent: number;
  /** 是否显示复选框 */
  showCheckbox: boolean;
  /** 是否为当前选中节点 */
  isCurrent: boolean;
  /** 是否高亮当前选中节点 */
  highlightCurrent: boolean;
  /** 自定义展开图标组件 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}>();

const emit = defineEmits<{
  (e: 'toggle', node: FlattenTreeItem): void;
  (e: 'click', node: FlattenTreeItem): void;
  (e: 'check', node: FlattenTreeItem, checked: boolean): void;
}>();

/** 处理节点点击事件 */
const handleClick = () => {
  if (props.node.disabled) return;
  emit('click', props.node);
};

/** 处理展开/收起切换 */
const handleToggle = () => {
  if (props.node.isLeaf) return;
  emit('toggle', props.node);
};

/** 处理复选框状态变更 */
const handleCheckChange = (e: Event) => {
  if (props.node.disabled) return;
  const target = e.target as HTMLInputElement;
  emit('check', props.node, target.checked);
};
</script>

<style scoped>
.bzsh-tree-node {
  /* 定义节点相关 CSS 变量 */
  --bzsh-tree-node-hover-bg: #f5f7fa;
  --bzsh-tree-node-current-color: #409eff;
  --bzsh-tree-node-current-bg: #f0f7ff;
  --bzsh-tree-node-disabled-color: #c0c4cc;
  --bzsh-tree-icon-color: #c0c4cc;
  --bzsh-tree-icon-hover-color: #909399;

  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.2s,
    color 0.2s;
  padding-right: 12px;
}

.bzsh-tree-node:hover {
  background-color: var(--bzsh-tree-node-hover-bg);
}

.bzsh-tree-node.is-current {
  color: var(--bzsh-tree-node-current-color);
  font-weight: 600;
}

.bzsh-tree-node.is-highlight.is-current {
  background-color: var(--bzsh-tree-node-current-bg);
}

.bzsh-tree-node.is-disabled {
  color: var(--bzsh-tree-node-disabled-color);
  cursor: not-allowed;
}

.bzsh-tree-node-label {
  font-size: 14px;
  line-height: 1;
}

/* 增加选中时的文字颜色变深，提升对比度 */
.bzsh-tree-node.is-current .bzsh-tree-node-label {
  color: var(--bzsh-tree-node-current-color);
}

.bzsh-tree-node-indent {
  display: flex;
  height: 100%;
  position: relative;
  flex-shrink: 0;
}

.bzsh-tree-indent-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: transparent; /* 默认隐藏引导线，可配置 */
}

.bzsh-tree-node-icon {
  width: 24px;
  height: 24px;
  padding: 6px;
  box-sizing: border-box;
  cursor: pointer;
  color: var(--bzsh-tree-icon-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s,
    color 0.2s;
  flex-shrink: 0;
}

.bzsh-tree-node-icon:hover {
  color: var(--bzsh-tree-icon-hover-color);
}

.bzsh-tree-node-icon.is-expanded {
  transform: rotate(90deg);
}

.bzsh-tree-node-icon.is-leaf {
  cursor: default;
  opacity: 0; /* 叶子节点不显示图标但保留占位 */
  pointer-events: none;
}

.bzsh-tree-node-placeholder {
  width: 24px;
  flex-shrink: 0;
}

.bzsh-tree-node-checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  height: 100%;
}

.bzsh-tree-node-checkbox {
  margin: 0;
  cursor: pointer;
  width: 14px;
  height: 14px;
  accent-color: var(--bzsh-tree-node-current-color); /* 现代浏览器原生 checkbox 颜色 */
}

.bzsh-tree-node-checkbox:disabled {
  cursor: not-allowed;
}

.bzsh-tree-node-content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
