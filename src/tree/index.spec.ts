import { describe, it, expect } from '@jest/globals';

import { Tree, TreeNode } from '.';

describe('Tree', () => {
  it('should create a Tree', () => {
    const tree = new Tree();

    expect(tree).toBeInstanceOf(Tree);
  });

  it('should return 0', () => {
    const tree = new Tree();

    expect(tree.size).toEqual(0);
  });

  it('should add a root node', () => {
    const tree = new Tree();
    expect(tree.isEmpty).toEqual(true);
    expect(tree.root).toEqual(undefined);

    tree.addNode('lol');

    expect(tree.isEmpty).toEqual(false);
    expect(tree.root).toBeInstanceOf(TreeNode);
  });
});
