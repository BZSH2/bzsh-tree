import { shallowRef, computed, watch } from 'vue';
import type { FlattenTreeItem, TreeProps, TreeKey, DefaultTreeItem } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useTree<T = DefaultTreeItem>(props: TreeProps<T>, emit: any) {
  const nodeMap = shallowRef<Map<TreeKey, FlattenTreeItem<T>>>(new Map());
  const rootNodes = shallowRef<FlattenTreeItem<T>[]>([]);
  const flattenData = shallowRef<FlattenTreeItem<T>[]>([]);
  const currentNodeKey = shallowRef<TreeKey | undefined>();

  const valueKey = computed(() => props.props?.value || props.nodeKey || 'id');
  const labelKey = computed(() => props.props?.label || 'label');
  const childrenKey = computed(() => props.props?.children || 'children');
  const disabledKey = computed(() => props.props?.disabled || 'disabled');
  const defaultExpandedKeySet = computed(() => new Set(props.defaultExpandedKeys || []));
  const defaultCheckedKeySet = computed(() => new Set(props.defaultCheckedKeys || []));

  const computeVisibleData = () => {
    const result: FlattenTreeItem<T>[] = [];

    const stack = [...rootNodes.value].reverse();

    while (stack.length > 0) {
      const node = stack.pop();
      if (!node || !node.visible) continue;

      result.push(node);

      if (node.expanded && node.children.length > 0) {
        // 将子节点反向压入栈中，保证出栈顺序是从上到下
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i]);
        }
      }
    }

    flattenData.value = result;
  };

  watch(
    () => props.data,
    (newData) => {
      const newMap = new Map();

      const build = (
        nodes: T[],
        level = 0,
        parentKey: TreeKey | null = null,
      ): FlattenTreeItem<T>[] => {
        const result: FlattenTreeItem<T>[] = [];
        for (const rawNode of nodes) {
          const node = rawNode as Record<string, any>;
          const key = node[valueKey.value as string];
          const childrenData = node[childrenKey.value as string] || [];
          const isLeaf = childrenData.length === 0;

          let isDisabled = false;
          if (typeof disabledKey.value === 'function') {
            isDisabled = (disabledKey.value as (data: T) => boolean)(rawNode);
          } else if (typeof disabledKey.value === 'string') {
            isDisabled = !!node[disabledKey.value];
          }

          const flattenNode: FlattenTreeItem<T> = {
            key,
            label: node[labelKey.value as string],
            data: rawNode,
            parentKey,
            children: [],
            level,
            isLeaf,
            expanded: defaultExpandedKeySet.value.has(key),
            disabled: isDisabled,
            checked: defaultCheckedKeySet.value.has(key),
            indeterminate: false,
            visible: true,
          };

          newMap.set(key, flattenNode);
          if (!isLeaf) {
            flattenNode.children = build(childrenData, level + 1, key);
          }
          result.push(flattenNode);
        }
        return result;
      };

      rootNodes.value = build(newData);
      nodeMap.value = newMap;
      computeVisibleData();
    },
    { deep: true, immediate: true },
  );

  const handleNodeClick = (node: FlattenTreeItem<T>) => {
    currentNodeKey.value = node.key;
    emit('node-click', node.data, node);
    emit('current-change', node.data, node);
  };

  const expandAll = () => {
    Array.from(nodeMap.value.values()).forEach((node) => {
      if (!node.isLeaf) node.expanded = true;
    });
    computeVisibleData();
  };

  const collapseAll = () => {
    Array.from(nodeMap.value.values()).forEach((node) => {
      if (!node.isLeaf) node.expanded = false;
    });
    computeVisibleData();
  };

  const getCurrentKey = () => currentNodeKey.value;
  const getCurrentNode = () => {
    if (currentNodeKey.value !== undefined) {
      return nodeMap.value.get(currentNodeKey.value)?.data;
    }
    return undefined;
  };
  const setCurrentKey = (key: TreeKey) => {
    currentNodeKey.value = key;
  };

  return {
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
  };
}
