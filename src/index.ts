import type { App } from 'vue';
import Tree from './components/Tree.vue';
import type { TreeItem, TreeProps } from './components/types';

export { Tree };
export type { TreeItem, TreeProps };

export default {
  install(app: App) {
    app.component('BzshTree', Tree);
  },
};
