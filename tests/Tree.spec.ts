import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tree from '../src/components/Tree.vue';

describe('Tree.vue', () => {
  it('renders correctly with empty data', () => {
    const wrapper = mount(Tree, {
      props: {
        data: [],
      },
    });
    expect(wrapper.classes()).toContain('bzsh-tree');
    expect(wrapper.findAll('.bzsh-tree-node').length).toBe(0);
  });

  it('renders correctly with given data', () => {
    const data = [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
    ];
    const wrapper = mount(Tree, {
      props: {
        data,
      },
    });
    const items = wrapper.findAll('.bzsh-tree-node__label');
    expect(items.length).toBe(2);
    expect(items[0].text()).toBe('Node 1');
  });
});
