import { type Ref } from 'vue';
import type { FlattenTreeItem, TreeProps, TreeKey } from '../types';

/**
 * 筛选逻辑 Composable
 * 负责根据关键词过滤树节点。
 *
 * @param props 组件 Props
 * @param nodeMap 扁平化节点 Map
 * @param computeVisibleData 重新计算可见数据的回调
 */
export function useFilter(
  props: TreeProps,
  nodeMap: Ref<Map<TreeKey, FlattenTreeItem>>,
  computeVisibleData: () => void,
) {
  /**
   * 执行过滤
   * @param value 过滤关键词
   */
  const filter = (value: string) => {
    if (!props.filterMethod) return;

    // 重置所有节点可见性
    Array.from(nodeMap.value.values()).forEach((n) => (n.visible = false));

    /**
     * 递归遍历节点，确定是否可见
     * 如果子节点可见，父节点也必须可见。
     */
    const traverse = (nodes: FlattenTreeItem[]): boolean => {
      let isVisible = false;
      for (const node of nodes) {
        // 当前节点自身是否匹配
        const selfVisible = props.filterMethod ? props.filterMethod(value, node.data) : true;
        // 子节点是否匹配 (如果有子节点，继续向下找)
        let childVisible = false;
        if (!node.isLeaf) {
          childVisible = traverse(node.children);
        }

        // 只要自身匹配或者子节点中有匹配的，当前节点就应该可见
        node.visible = selfVisible || childVisible;
        if (node.visible) isVisible = true;
      }
      return isVisible;
    };

    const rootNodes = Array.from(nodeMap.value.values()).filter((n) => n.parentKey === null);
    traverse(rootNodes);

    // 过滤后重新计算可视列表
    computeVisibleData();
  };

  return {
    filter,
  };
}
