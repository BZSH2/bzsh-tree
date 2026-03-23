import type { InjectionKey } from 'vue';
import type { TreeContext } from './types';

export const treeContextKey: InjectionKey<TreeContext> = Symbol('treeContext');
