import type { Component, VNode } from 'vue';

// 树节点数据的默认约束
export type DefaultTreeItem = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

// 为了向后兼容保留 TreeItem
export type TreeItem = DefaultTreeItem;

// 节点唯一标识
export type TreeKey = string | number;

// 数据键名映射 (泛型化，T 为节点数据类型)
export interface TreeOptionProps<T = DefaultTreeItem> {
  value?: string | keyof T;
  label?: string | keyof T;
  children?: string | keyof T;
  disabled?: string | keyof T | ((data: T) => boolean);
}

// 拍平后的树节点 (泛型化)
export interface FlattenTreeItem<T = DefaultTreeItem> {
  key: TreeKey;
  label: string;
  data: T;
  level: number;
  parentKey: TreeKey | null;
  children: FlattenTreeItem<T>[];
  isLeaf: boolean;
  expanded: boolean;
  disabled: boolean;
  checked: boolean;
  indeterminate: boolean;
  visible: boolean;
}

// Tree 组件的 Props (泛型化)
export interface TreeProps<T = DefaultTreeItem> {
  data: T[];
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
  icon?: Component;
  // 虚拟滚动相关
  height?: number;
  itemSize?: number;
  filterMethod?: (query: string, data: T, node: FlattenTreeItem<T>) => boolean;
}

// Tree 节点组件的 Props (泛型化)
export interface TreeNodeProps<T = DefaultTreeItem> {
  node: FlattenTreeItem<T>;
  highlightCurrent?: boolean;
  showCheckbox?: boolean;
  isCurrent?: boolean;
  indent?: number;
  icon?: Component;
}

// Tree 节点内容 (泛型化)
export interface TreeNodeContentProps<T = DefaultTreeItem> {
  node: FlattenTreeItem<T>;
  data: T;
}

// provide/inject 上下文 (泛型化)
export interface TreeContext<T = DefaultTreeItem> {
  props: TreeProps<T>;
  // methods
  handleNodeClick: (node: FlattenTreeItem<T>) => void;
  handleCheckChange: (node: FlattenTreeItem<T>, checked: boolean) => void;
  handleToggleExpand: (node: FlattenTreeItem<T>) => void;
}

// 渲染内容的函数
export type RenderContent<T = DefaultTreeItem> = (
  props: TreeNodeContentProps<T>,
) => VNode | VNode[];
