import { ref, computed } from 'vue';
import type { TreeItem, FlattenTreeItem, TreeProps, TreeKey } from '../types';

/**
 * 核心数据管理 Composable
 * 负责树的数据结构转换、扁平化、展开/收起状态管理。
 *
 * @param props 组件 Props
 */
export function useTreeData(props: TreeProps) {
  // 获取用户配置的属性映射
  const valueKey = computed(() => props.props?.value || props.nodeKey || 'id');
  const labelKey = computed(() => props.props?.label || 'label');
  const childrenKey = computed(() => props.props?.children || 'children');
  const disabledKey = computed(() => props.props?.disabled || 'disabled');

  // 所有拍平的节点字典，便于快速查找 (key -> FlattenTreeItem)
  const nodeMap = ref<Map<TreeKey, FlattenTreeItem>>(new Map());
  // 当前渲染的一维数组 (经过 filter 和 展开状态计算后的)
  const flattenData = ref<FlattenTreeItem[]>([]);
  // 当前高亮的节点 Key
  const currentNodeKey = ref<TreeKey | undefined>(props.currentNodeKey);

  /**
   * 初始化与构建树
   * 将嵌套的 TreeItem 数据递归转换为扁平的 FlattenTreeItem 数组，并存入 nodeMap。
   *
   * @param nodes 原始树节点数组
   * @param level 当前层级
   * @param parentKey 父节点 Key
   */
  const buildTree = (
    nodes: TreeItem[],
    level = 0,
    parentKey: TreeKey | null = null,
  ): FlattenTreeItem[] => {
    const result: FlattenTreeItem[] = [];

    for (const node of nodes) {
      const key = node[valueKey.value];
      const childrenData = node[childrenKey.value] || [];
      const isLeaf = childrenData.length === 0;

      // 解析 disabled
      let isDisabled = false;
      if (typeof disabledKey.value === 'function') {
        isDisabled = (disabledKey.value as (data: TreeItem) => boolean)(node);
      } else if (typeof disabledKey.value === 'string') {
        isDisabled = !!node[disabledKey.value];
      }

      const isExpanded = props.defaultExpandedKeys?.includes(key) || false;
      const isChecked = props.defaultCheckedKeys?.includes(key) || false;

      const flattenNode: FlattenTreeItem = {
        key,
        label: node[labelKey.value],
        data: node,
        parentKey,
        children: [], // 等待下面填充
        level,
        isLeaf,
        expanded: isExpanded,
        disabled: isDisabled,
        checked: isChecked,
        indeterminate: false,
        visible: true,
      };

      nodeMap.value.set(key, flattenNode);
      result.push(flattenNode);

      if (!isLeaf) {
        const childrenNodes = buildTree(childrenData, level + 1, key);
        flattenNode.children = childrenNodes;
      }
    }

    return result;
  };

  /**
   * 计算可视的一维数组
   * 根据节点的 visible 和 expanded 属性，筛选出当前应该显示在列表中的节点。
   */
  const computeVisibleData = () => {
    const result: FlattenTreeItem[] = [];

    const traverse = (nodes: FlattenTreeItem[]) => {
      for (const node of nodes) {
        if (!node.visible) continue;
        result.push(node);
        if (node.expanded && node.children.length > 0) {
          traverse(node.children);
        }
      }
    };

    // 仅从根节点开始遍历
    const rootNodes = Array.from(nodeMap.value.values()).filter((n) => n.parentKey === null);
    traverse(rootNodes);
    flattenData.value = result;
  };

  /** 展开所有节点 */
  const expandAll = () => {
    Array.from(nodeMap.value.values()).forEach((node) => {
      if (!node.isLeaf) node.expanded = true;
    });
    computeVisibleData();
  };

  /** 收起所有节点 */
  const collapseAll = () => {
    Array.from(nodeMap.value.values()).forEach((node) => {
      if (!node.isLeaf) node.expanded = false;
    });
    computeVisibleData();
  };

  /**
   * 设置新的数据源
   * @param data 新的树形数据
   */
  const setData = (data: TreeItem[]) => {
    nodeMap.value.clear();
    buildTree(data);
    computeVisibleData();
  };

  /**
   * 切换节点展开/收起状态
   * @param node 目标节点
   */
  const toggleExpand = (node: FlattenTreeItem) => {
    if (node.isLeaf) return;
    node.expanded = !node.expanded;
    computeVisibleData();
  };

  return {
    nodeMap,
    flattenData,
    currentNodeKey,
    valueKey,
    labelKey,
    childrenKey,
    disabledKey,
    buildTree,
    computeVisibleData,
    expandAll,
    collapseAll,
    setData,
    toggleExpand,
  };
}
