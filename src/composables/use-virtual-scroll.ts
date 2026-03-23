import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { FlattenTreeItem, TreeProps, DefaultTreeItem } from '../types';

export function useVirtualScroll<T = DefaultTreeItem>(
  props: TreeProps<T>,
  flattenData: Ref<FlattenTreeItem<T>[]>,
) {
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);

  // 总高度 = 节点数量 * 每个节点的高度
  const totalHeight = computed(() => (flattenData.value.length || 0) * (props.itemSize || 0));

  // 可视区域显示的节点数量
  const visibleCount = computed(() => Math.ceil((props.height || 0) / (props.itemSize || 1)));

  // 缓冲区大小，上下各预渲染的节点数量，避免快速滚动时白屏
  const bufferCount = 4;

  // 当前滚动的理论起始索引
  const computedStartIndex = computed(() => Math.floor(scrollTop.value / (props.itemSize || 1)));

  // 实际渲染的起始索引 (带顶部缓冲区，并防止越界)
  const startIndex = computed(() => Math.max(0, computedStartIndex.value - bufferCount));

  // 实际渲染的结束索引 (带底部缓冲区，并防止越界)
  const endIndex = computed(() =>
    Math.min(flattenData.value.length, computedStartIndex.value + visibleCount.value + bufferCount),
  );

  // 当前应该渲染的数据切片
  const visibleData = computed(() => {
    return flattenData.value.slice(startIndex.value, endIndex.value);
  });

  // 偏移量：需要根据实际的 startIndex (而不是理论的) 来计算，确保内容区域对齐
  const offset = computed(() => startIndex.value * (props.itemSize || 0));

  const handleScroll = () => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop;
    }
  };

  return {
    containerRef,
    totalHeight,
    visibleData,
    offset,
    handleScroll,
  };
}
