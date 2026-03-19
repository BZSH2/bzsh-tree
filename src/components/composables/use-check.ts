import { type Ref } from 'vue';
import type { FlattenTreeItem, TreeProps, TreeKey } from '../types';

/**
 * 复选框逻辑 Composable
 * 处理节点的勾选、取消勾选、以及父子节点的联动逻辑。
 *
 * @param props 组件 Props
 * @param nodeMap 扁平化节点 Map
 */
export function useCheck(props: TreeProps, nodeMap: Ref<Map<TreeKey, FlattenTreeItem>>) {
  /**
   * 向下更新子节点状态
   * 递归更新所有子节点的 checked 状态，使其与父节点一致。
   */
  const updateDownwards = (node: FlattenTreeItem, checked: boolean) => {
    node.checked = checked;
    node.indeterminate = false;
    if (!props.checkStrictly && node.children.length > 0) {
      node.children.forEach((child) => {
        if (!child.disabled) {
          updateDownwards(child, checked);
        }
      });
    }
  };

  /**
   * 向上更新父节点状态
   * 递归检查父节点的子节点状态，更新父节点的 checked 和 indeterminate 状态。
   */
  const updateUpwards = (node: FlattenTreeItem) => {
    if (props.checkStrictly || node.parentKey === null) return;

    const parent = nodeMap.value.get(node.parentKey);
    if (!parent) return;

    const validChildren = parent.children.filter((c) => !c.disabled);
    if (validChildren.length === 0) return;

    let checkedCount = 0;
    let indeterminateCount = 0;

    validChildren.forEach((child) => {
      if (child.checked) checkedCount++;
      if (child.indeterminate) indeterminateCount++;
    });

    if (checkedCount === validChildren.length) {
      parent.checked = true;
      parent.indeterminate = false;
    } else if (checkedCount === 0 && indeterminateCount === 0) {
      parent.checked = false;
      parent.indeterminate = false;
    } else {
      parent.checked = false;
      parent.indeterminate = true;
    }

    updateUpwards(parent);
  };

  /**
   * 切换节点勾选状态
   * @param node 目标节点
   * @param checked 是否勾选
   */
  const toggleCheck = (node: FlattenTreeItem, checked: boolean) => {
    if (node.disabled) return;

    updateDownwards(node, checked);
    updateUpwards(node);
  };

  /**
   * 设置勾选的 Key 数组
   * @param keys 需要勾选的节点 Key 数组
   */
  const setCheckedKeys = (keys: TreeKey[]) => {
    // 先清空
    Array.from(nodeMap.value.values()).forEach((n) => {
      n.checked = false;
      n.indeterminate = false;
    });
    // 重新勾选
    keys.forEach((key) => {
      const node = nodeMap.value.get(key);
      if (node) {
        updateDownwards(node, true);
      }
    });
    // 更新父级
    Array.from(nodeMap.value.values()).forEach((node) => {
      if (node.isLeaf) updateUpwards(node);
    });
  };

  /**
   * 设置单个节点的勾选状态
   */
  const setChecked = (key: TreeKey, checked: boolean) => {
    const node = nodeMap.value.get(key);
    if (node) toggleCheck(node, checked);
  };

  /** 获取所有勾选的节点数据 */
  const getCheckedNodes = (leafOnly = false) =>
    Array.from(nodeMap.value.values())
      .filter((n) => n.checked && (!leafOnly || n.isLeaf))
      .map((n) => n.data);

  /** 获取所有勾选的节点 Key */
  const getCheckedKeys = (leafOnly = false) =>
    Array.from(nodeMap.value.values())
      .filter((n) => n.checked && (!leafOnly || n.isLeaf))
      .map((n) => n.key);

  /** 获取半选状态的节点数据 */
  const getHalfCheckedNodes = () =>
    Array.from(nodeMap.value.values())
      .filter((n) => n.indeterminate)
      .map((n) => n.data);

  /** 获取半选状态的节点 Key */
  const getHalfCheckedKeys = () =>
    Array.from(nodeMap.value.values())
      .filter((n) => n.indeterminate)
      .map((n) => n.key);

  /** 初始化默认勾选状态 */
  const initCheckedState = () => {
    if (props.showCheckbox && !props.checkStrictly && props.defaultCheckedKeys?.length) {
      props.defaultCheckedKeys.forEach((key) => {
        const node = nodeMap.value.get(key);
        if (node) updateDownwards(node, true);
      });
      // 然后更新所有父节点
      Array.from(nodeMap.value.values()).forEach((node) => {
        if (node.isLeaf) updateUpwards(node);
      });
    }
  };

  return {
    toggleCheck,
    setCheckedKeys,
    setChecked,
    getCheckedNodes,
    getCheckedKeys,
    getHalfCheckedNodes,
    getHalfCheckedKeys,
    initCheckedState,
  };
}
