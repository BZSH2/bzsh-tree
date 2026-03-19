export type TreeKey = string | number;

/** 原始树节点数据接口 (允许任意键值对) */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TreeItem = Record<string, any>;

/** 自定义 Props 映射配置 */
export interface TreeOptionProps {
  /** 指定节点标签为节点对象的某个属性值 */
  label?: string;
  /** 指定子树为节点对象的某个属性值 */
  children?: string;
  /** 指定节点选择框是否禁用为节点对象的某个属性值 */
  disabled?: string | ((data: TreeItem) => boolean);
  /** 指定节点的值为节点对象的某个属性值 */
  value?: string;
  /** 自定义节点类名 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class?: string | ((data: TreeItem) => string | Record<string, any> | Array<any>);
}

/** 树组件 Props */
export interface TreeProps {
  /** 树形数据 */
  data: TreeItem[];
  /** 内容为空的时候展示的文本 */
  emptyText?: string;
  /** 容器高度 (虚拟滚动需要) */
  height?: number;
  /** 每个节点的高度 (像素) */
  itemSize?: number;
  /** 配置选项，请看 TreeOptionProps */
  props?: TreeOptionProps;
  /** 是否高亮当前选中节点 */
  highlightCurrent?: boolean;
  /** 是否在点击节点的时候展开或者收缩节点 */
  expandOnClickNode?: boolean;
  /** 是否在点击节点的时候选中节点 */
  checkOnClickNode?: boolean;
  /** 默认展开的节点的 key 的数组 */
  defaultExpandedKeys?: TreeKey[];
  /** 节点是否可被选择 */
  showCheckbox?: boolean;
  /** 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法 */
  checkStrictly?: boolean;
  /** 默认勾选的节点的 key 的数组 */
  defaultCheckedKeys?: TreeKey[];
  /** 当前选中的节点 */
  currentNodeKey?: TreeKey;
  /** 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示 */
  filterMethod?: (value: string, data: TreeItem) => boolean;
  /** 相邻级节点间的水平缩进，单位为像素 */
  indent?: number;
  /** 自定义树节点的展开图标 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  /** 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 */
  nodeKey?: string;
}

/** 内部使用的扁平化节点接口 */
export interface FlattenTreeItem {
  /** 唯一标识 */
  key: TreeKey;
  /** 显示的文本标签 */
  label: string;
  /** 原始数据引用 */
  data: TreeItem;
  /** 父节点 Key */
  parentKey: TreeKey | null;
  /** 子节点列表引用 */
  children: FlattenTreeItem[];
  /** 缩进层级 (从 0 开始) */
  level: number;
  /** 是否为叶子节点 (无子节点) */
  isLeaf: boolean;
  /** 是否展开 */
  expanded: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否勾选 */
  checked: boolean;
  /** 是否半选 (Indeterminate) */
  indeterminate: boolean;
  /** 是否可见 (过滤状态) */
  visible: boolean;
}
