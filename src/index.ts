import type { App, Plugin } from 'vue';
import Tree from './components/Tree.vue';

export const BzshTree = Tree as unknown as typeof Tree & Plugin;

BzshTree.install = (app: App): void => {
  app.component('BzshTree', BzshTree);
};

export default BzshTree;

export * from './types';
