# bzsh-tree

> A modern, lightweight Tree component for Vue 3.
> 
> [中文文档](./README.zh-CN.md)

## Features

- ⚡️ Built for Vue 3 and TypeScript
- 🎨 Modern and customizable UI
- 📦 Lightweight and dependency-free (except Vue)
- 🛠️ Strict TypeScript types and comprehensive linting rules built-in

## Installation

You can install `bzsh-tree` via your preferred package manager:

```bash
npm install bzsh-tree
# or
yarn add bzsh-tree
# or
pnpm add bzsh-tree
```

## Quick Start

### Global Registration

You can register the component globally in your `main.ts` or `main.js`:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import BzshTree from 'bzsh-tree'
import 'bzsh-tree/style.css' // Import styles

const app = createApp(App)

app.use(BzshTree)
app.mount('#app')
```

Then you can use it in any template:

```vue
<template>
  <BzshTree :data="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    label: 'Node 1',
    children: [
      { id: 2, label: 'Child Node 1-1' },
      { id: 3, label: 'Child Node 1-2' }
    ]
  },
  {
    id: 4,
    label: 'Node 2'
  }
])
</script>
```

### Local Registration

Alternatively, you can import and register it locally:

```vue
<template>
  <Tree :data="treeData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tree } from 'bzsh-tree'
import 'bzsh-tree/style.css'

const treeData = ref([
  {
    id: 1,
    label: 'Local Node'
  }
])
</script>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `TreeItem[]` | `[]` | The array of data objects to render the tree |

### TreeItem Interface

```typescript
interface TreeItem {
  id: string | number;
  label: string;
  children?: TreeItem[];
}
```

## License

[ISC](LICENSE)
