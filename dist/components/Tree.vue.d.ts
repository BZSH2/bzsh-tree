import { TreeItem, FlattenTreeItem, TreeProps, TreeKey } from './types';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        empty?(_: {}): any;
        default?(_: {
            node: FlattenTreeItem;
            data: TreeItem;
        }): any;
    };
    refs: {
        containerRef: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<TreeProps, {
    getCheckedNodes: (leafOnly?: boolean) => TreeItem[];
    getCheckedKeys: (leafOnly?: boolean) => TreeKey[];
    getHalfCheckedNodes: () => TreeItem[];
    getHalfCheckedKeys: () => TreeKey[];
    setCheckedKeys: (keys: TreeKey[]) => void;
    setChecked: (key: TreeKey, checked: boolean) => void;
    getCurrentKey: () => TreeKey | undefined;
    getCurrentNode: () => TreeItem | undefined;
    setCurrentKey: (key: TreeKey) => void;
    expandAll: () => void;
    collapseAll: () => void;
    setData: (data: TreeItem[]) => void;
    filter: (value: string) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    check: (data: TreeItem, checkedInfo: {
        checkedNodes: TreeItem[];
        checkedKeys: TreeKey[];
        halfCheckedNodes: TreeItem[];
        halfCheckedKeys: TreeKey[];
    }) => any;
    "node-click": (data: TreeItem, node: FlattenTreeItem) => any;
    "check-change": (data: TreeItem, checked: boolean, indeterminate: boolean) => any;
    "current-change": (data: TreeItem, node: FlattenTreeItem) => any;
    "node-expand": (data: TreeItem, node: FlattenTreeItem) => any;
    "node-collapse": (data: TreeItem, node: FlattenTreeItem) => any;
}, string, import('vue').PublicProps, Readonly<TreeProps> & Readonly<{
    onCheck?: ((data: TreeItem, checkedInfo: {
        checkedNodes: TreeItem[];
        checkedKeys: TreeKey[];
        halfCheckedNodes: TreeItem[];
        halfCheckedKeys: TreeKey[];
    }) => any) | undefined;
    "onNode-click"?: ((data: TreeItem, node: FlattenTreeItem) => any) | undefined;
    "onCheck-change"?: ((data: TreeItem, checked: boolean, indeterminate: boolean) => any) | undefined;
    "onCurrent-change"?: ((data: TreeItem, node: FlattenTreeItem) => any) | undefined;
    "onNode-expand"?: ((data: TreeItem, node: FlattenTreeItem) => any) | undefined;
    "onNode-collapse"?: ((data: TreeItem, node: FlattenTreeItem) => any) | undefined;
}>, {
    height: number;
    itemSize: number;
    indent: number;
    showCheckbox: boolean;
    highlightCurrent: boolean;
    emptyText: string;
    expandOnClickNode: boolean;
    checkOnClickNode: boolean;
    checkStrictly: boolean;
    nodeKey: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    containerRef: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
