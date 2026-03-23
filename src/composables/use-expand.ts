import type { FlattenTreeItem, TreeProps, DefaultTreeItem } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useExpand<T = DefaultTreeItem>(
  props: TreeProps<T>,
  emit: any,
  { computeVisibleData }: { computeVisibleData: () => void },
) {
  const handleToggleExpand = (node: FlattenTreeItem<T>) => {
    if (node.isLeaf) return;
    node.expanded = !node.expanded;
    computeVisibleData();

    if (node.expanded) {
      emit('node-expand', node.data, node);
    } else {
      emit('node-collapse', node.data, node);
    }
  };

  return {
    handleToggleExpand,
  };
}
