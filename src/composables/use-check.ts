import type { FlattenTreeItem, TreeProps, TreeKey, DefaultTreeItem } from '../types';
import type { Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCheck<T = DefaultTreeItem>(
  props: TreeProps<T>,
  emit: any,
  nodeMap: Ref<Map<TreeKey, FlattenTreeItem<T>>>,
) {
  const collectCheckedInfo = () => {
    const checkedNodes: T[] = [];
    const checkedKeys: TreeKey[] = [];
    const halfCheckedNodes: T[] = [];
    const halfCheckedKeys: TreeKey[] = [];

    for (const node of nodeMap.value.values()) {
      if (node.checked) {
        checkedNodes.push(node.data);
        checkedKeys.push(node.key);
      } else if (node.indeterminate) {
        halfCheckedNodes.push(node.data);
        halfCheckedKeys.push(node.key);
      }
    }

    return {
      checkedNodes,
      checkedKeys,
      halfCheckedNodes,
      halfCheckedKeys,
    };
  };

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
    const stack = [...node.children];
    while (stack.length > 0) {
      const child = stack.pop();
      if (!child) continue;
      child.checked = checked;
      child.indeterminate = false;
      if (child.children.length > 0) {
        stack.push(...child.children);
      }
    }
  };

  const handleCheckChange = (node: FlattenTreeItem<T>, checked: boolean) => {
    node.checked = checked;
    node.indeterminate = false;

    if (!props.checkStrictly) {
      updateDownward(node, checked);
      updateUpward(node);
    }

    emit('check-change', node.data, node.checked, node.indeterminate);
    emit('check', node.data, collectCheckedInfo());
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
    if (props.checkStrictly) {
      const keySet = new Set(keys);
      nodeMap.value.forEach((node) => {
        node.checked = keySet.has(node.key);
        node.indeterminate = false;
      });
      return;
    }

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
        updateDownward(node, true);
        updateUpward(node);
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
