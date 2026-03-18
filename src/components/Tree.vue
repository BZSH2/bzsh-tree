<template>
  <div class="bzsh-tree">
    <ul>
      <li v-for="item in data" :key="item.id">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface TreeItem {
  id: string | number;
  label: string;
  children?: TreeItem[];
}

defineProps<{
  data: TreeItem[];
}>();
</script>

<style scoped>
.bzsh-tree {
  font-family: sans-serif;
}
</style>
