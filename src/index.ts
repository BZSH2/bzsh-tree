import type { App } from 'vue';
import Tree from './components/Tree.vue';

export { Tree };

export default {
  install(app: App) {
    app.component('BzshTree', Tree);
  },
};
