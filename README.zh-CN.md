# bzsh-tree

> 一个为 Vue 3 打造的现代化、轻量级树形组件。
>
> [English Documentation](./README.md)

## 特性

- ⚡️ 专为 Vue 3 和 TypeScript 打造
- 🎨 现代化且易于定制的 UI 界面
- 📦 轻量级，除了 Vue 无其他额外依赖
- 🛠️ 内置严格的 TypeScript 类型和完善的工程化校验规则

## 安装

你可以使用你喜欢的包管理器进行安装：

```bash
npm install bzsh-tree
# 或者
yarn add bzsh-tree
# 或者
pnpm add bzsh-tree
```

## 快速上手

### 全局注册

你可以在项目的入口文件 `main.ts` 或 `main.js` 中全局注册该组件：

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import BzshTree from 'bzsh-tree';

const app = createApp(App);

app.use(BzshTree);
app.mount('#app');
```

全局注册后，你可以在任何模板中直接使用它：

```vue
<template>
  <BzshTree :data="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const treeData = ref([
  {
    id: 1,
    label: '节点 1',
    children: [
      { id: 2, label: '子节点 1-1' },
      { id: 3, label: '子节点 1-2' },
    ],
  },
  {
    id: 4,
    label: '节点 2',
  },
]);
</script>
```

### 局部注册

如果你只希望在特定组件中使用，也可以按需引入：

```vue
<template>
  <Tree :data="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Tree } from 'bzsh-tree';

const treeData = ref([
  {
    id: 1,
    label: '局部引入的节点',
  },
]);
</script>
```

## 组件属性 (Props)

| 属性名 | 类型         | 默认值 | 描述                     |
| ------ | ------------ | ------ | ------------------------ |
| `data` | `TreeItem[]` | `[]`   | 渲染树形结构的数据源数组 |

### TreeItem 数据结构说明

```typescript
interface TreeItem {
  id: string | number; // 节点的唯一标识符
  label: string; // 节点显示的文本内容
  children?: TreeItem[]; // 子节点数组（可选）
}
```

## 开源协议

[ISC](LICENSE)
