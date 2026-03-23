import type { FlattenTreeItem, TreeProps, TreeKey, DefaultTreeItem } from '../types';
import type { Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCheck<T = DefaultTreeItem>(
  props: TreeProps<T>,
  emit: any,
  nodeMap: Ref<Map<TreeKey, FlattenTreeItem<T>>>,
) {
  const getCheckedNodes = (): T[] => {
    const result: T[] = [];
    for (const node of nodeMap.value.values()) {
      if (node.checked) result.push(node.data);
    }
    return result;
  };

  const getCheckedKeys = (): TreeKey[] => {
    const result: TreeKey[] = [];
    for (const node of nodeMap.value.values()) {
      if (node.checked) result.push(node.key);
    }
    return result;
  };

  const getHalfCheckedNodes = (): T[] => {
    const result: T[] = [];
    for (const node of nodeMap.value.values()) {
      if (node.indeterminate) result.push(node.data);
    }
    return result;
  };

  const getHalfCheckedKeys = (): TreeKey[] => {
    const result: TreeKey[] = [];
    for (const node of nodeMap.value.values()) {
      if (node.indeterminate) result.push(node.key);
    }
    return result;
  };

  const updateUpward = (node: FlattenTreeItem<T>) => {
    let parent = nodeMap.value.get(node.parentKey as TreeKey);
    while (parent) {
      const children = parent.children;
      const allChecked = children.every((child) => child.checked);
      const halfChecked = children.some((child) => child.checked || child.indeterminate);

      parent.checked = allChecked;
      parent.indeterminate = !allChecked && halfChecked;
      parent = nodeMap.value.get(parent.parentKey as TreeKey);
    }
  };

  const updateDownward = (node: FlattenTreeItem<T>, checked: boolean) => {
    node.children.forEach((child) => {
      child.checked = checked;
      child.indeterminate = false;
      updateDownward(child, checked);
    });
  };

  const handleCheckChange = (node: FlattenTreeItem<T>, checked: boolean) => {
    node.checked = checked;
    node.indeterminate = false;

    if (!props.checkStrictly) {
      updateDownward(node, checked);
      updateUpward(node);
    }

    emit('check-change', node.data, node.checked, node.indeterminate);
    emit('check', node.data, {
      checkedNodes: getCheckedNodes(),
      checkedKeys: getCheckedKeys(),
      halfCheckedNodes: getHalfCheckedNodes(),
      halfCheckedKeys: getHalfCheckedKeys(),
    });
  };

  const setChecked = (key: TreeKey, checked: boolean) => {
    const node = nodeMap.value.get(key);
    if (node) {
      node.checked = checked;
      node.indeterminate = false;
      if (!props.checkStrictly) {
        updateDownward(node, checked);
        updateUpward(node);
      }
    }
  };

  const setCheckedKeys = (keys: TreeKey[]) => {
    // 先清空所有勾选状态
    nodeMap.value.forEach((node) => {
      node.checked = false;
      node.indeterminate = false;
    });

    // 再根据传入的 keys 设置勾选状态
    keys.forEach((key) => {
      const node = nodeMap.value.get(key);
      if (node) {
        node.checked = true;
        if (!props.checkStrictly) {
          updateDownward(node, true);
          updateUpward(node);
        }
      }
    });
  };

  return {
    getCheckedNodes,
    getCheckedKeys,
    getHalfCheckedNodes,
    getHalfCheckedKeys,
    handleCheckChange,
    setChecked,
    setCheckedKeys,
  };
}
