import { TreeKey, TreeOptionProps, FlattenTreeItem } from '../types';
declare const _default: <T extends Record<string, any>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<Pick<Partial<{}> & Omit<{
        readonly "onNode-click"?: ((data: T, node: FlattenTreeItem<T>) => any) | undefined;
        readonly "onCurrent-change"?: ((data: T, node: FlattenTreeItem<T>) => any) | undefined;
        readonly "onNode-expand"?: ((data: T, node: FlattenTreeItem<T>) => any) | undefined;
        readonly "onNode-collapse"?: ((data: T, node: FlattenTreeItem<T>) => any) | undefined;
        readonly "onCheck-change"?: ((data: T, checked: boolean, indeterminate: boolean) => any) | undefined;
        readonly onCheck?: ((data: T, checkedInfo: {
            checkedNodes: T[];
            checkedKeys: TreeKey[];
            halfCheckedNodes: T[];
            halfCheckedKeys: TreeKey[];
        }) => any) | undefined;
    } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>, "onNode-click" | "onCurrent-change" | "onNode-expand" | "onNode-collapse" | "onCheck-change" | "onCheck"> & {
        data?: T[];
        emptyText?: string;
        nodeKey?: string | keyof T;
        props?: TreeOptionProps<T>;
        highlightCurrent?: boolean;
        expandOnClickNode?: boolean;
        checkOnClickNode?: boolean;
        defaultExpandedKeys?: TreeKey[];
        defaultCheckedKeys?: TreeKey[];
        showCheckbox?: boolean;
        checkStrictly?: boolean;
        indent?: number;
        height?: number;
        itemSize?: number;
        filterMethod?: (query: string, data: T, node: FlattenTreeItem<T>) => boolean;
    } & Partial<{}>> & import('vue').PublicProps;
    expose(exposed: import('vue').ShallowUnwrapRef<{
        getCheckedNodes: () => T[];
        getCheckedKeys: () => TreeKey[];
        getHalfCheckedNodes: () => T[];
        getHalfCheckedKeys: () => TreeKey[];
        setChecked: (key: TreeKey, checked: boolean) => void;
        setCheckedKeys: (keys: TreeKey[]) => void;
        getCurrentKey: () => TreeKey | undefined;
        getCurrentNode: () => T | undefined;
        setCurrentKey: (key: TreeKey) => void;
        expandAll: () => void;
        collapseAll: () => void;
        filter: (query: string) => void;
    }>): void;
    attrs: any;
    slots: {
        empty?(_: {}): any;
        default?(_: {
            node: FlattenTreeItem<T>;
            data: T;
        }): any;
    };
    emit: {
        (e: "node-click", data: T, node: FlattenTreeItem<T>): void;
        (e: "check-change", data: T, checked: boolean, indeterminate: boolean): void;
        (e: "check", data: T, checkedInfo: {
            checkedNodes: T[];
            checkedKeys: TreeKey[];
            halfCheckedNodes: T[];
            halfCheckedKeys: TreeKey[];
        }): void;
        (e: "current-change", data: T, node: FlattenTreeItem<T>): void;
        (e: "node-expand", data: T, node: FlattenTreeItem<T>): void;
        (e: "node-collapse", data: T, node: FlattenTreeItem<T>): void;
    };
}>) => import('vue').VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T]: T[K];
} & {};
