import type { Ref } from 'vue';
import type { FlattenTreeItem, TreeProps, TreeKey, DefaultTreeItem } from '../types';

export function useFilter<T = DefaultTreeItem>(
  props: TreeProps<T>,
  nodeMap: Ref<Map<TreeKey, FlattenTreeItem<T>>>,
  computeVisibleData: () => void,
) {
  const filter = (query: string) => {
    if (!props.filterMethod) return;

    const filterMethod = props.filterMethod;

    // 如果查询为空，恢复所有节点的可见性
    if (!query) {
      for (const node of nodeMap.value.values()) {
        node.visible = true;
      }
      computeVisibleData();
      return;
    }

    // 第一遍：根据 filterMethod 标记所有节点的可见性
    for (const node of nodeMap.value.values()) {
      node.visible = filterMethod(query, node.data, node);
    }

    // 第二遍：如果一个节点可见，确保它的所有祖先节点都可见并展开
    for (const node of nodeMap.value.values()) {
      if (node.visible) {
        let parentKey = node.parentKey;
        while (parentKey !== null) {
          const parent = nodeMap.value.get(parentKey);
          if (parent) {
            // 如果父节点已经可见且展开，说明其更上层的祖先也已经被处理过，可以提前跳出
            if (parent.visible && parent.expanded) {
              break;
            }
            parent.visible = true;
            parent.expanded = true; // 自动展开以显示匹配的子节点
            parentKey = parent.parentKey;
          } else {
            break;
          }
        }
      }
    }

    computeVisibleData();
  };

  return { filter };
}
