import { ref, computed, type Ref } from 'vue';
import type { TreeProps, FlattenTreeItem } from '../types';

/**
 * 虚拟滚动 Composable
 * 计算可视区域内应该渲染的节点列表，以提升大数据量下的渲染性能。
 *
 * @param props 组件 Props
 * @param flattenData 当前需要渲染的所有扁平化数据
 */
export function useVirtualScroll(props: TreeProps, flattenData: Ref<FlattenTreeItem[]>) {
  // 滚动容器引用
  const containerRef = ref<HTMLElement | null>(null);
  // 当前滚动高度
  const scrollTop = ref(0);

  // 列表总高度 (用于撑开滚动条)
  const totalHeight = computed(() => flattenData.value.length * (props.itemSize ?? 26));

  // 可视区域内能显示的节点数量 (+缓冲)
  const visibleCount = computed(
    () => Math.ceil((props.height ?? 400) / (props.itemSize ?? 26)) + 4,
  );

  // 起始索引
  const startIndex = computed(() => Math.floor(scrollTop.value / (props.itemSize ?? 26)));

  // 当前可视数据片段
  const visibleData = computed(() => {
    // 增加上下各 2 个节点的缓冲区，防止滚动时出现白屏
    const start = Math.max(0, startIndex.value - 2);
    const end = Math.min(flattenData.value.length, start + visibleCount.value);
    return flattenData.value.slice(start, end);
  });

  // 内容偏移量 (使用 transform: translateY 模拟滚动位置)
  const offset = computed(() => {
    const start = Math.max(0, startIndex.value - 2);
    return start * (props.itemSize ?? 26);
  });

  // 处理滚动事件
  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    scrollTop.value = target.scrollTop;
  };

  return {
    containerRef,
    scrollTop,
    totalHeight,
    visibleData,
    offset,
    handleScroll,
  };
}
