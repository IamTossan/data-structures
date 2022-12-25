import { v4 as uuidv4 } from 'uuid';

export class TreeNode {
  id: string = '';
  element: any;
  _parentId: TreeNode['id'] | null = null;
  children: Array<TreeNode['id']> = [];
  _tree: Tree;

  constructor(tree: Tree, element: any, parentId?: TreeNode['id']) {
    this._tree = tree;
    this.element = element;
    this._parentId = parentId || null;
    this.id = uuidv4();
  }

  get parent(): TreeNode | undefined {
    if (this._parentId === null) {
      return undefined;
    }
    return this._tree.getNodeById(this._parentId);
  }

  get numChildren(): number {
    return this.children.length;
  }

  get depth(): number {
    if (this.isRoot) {
      return 0;
    }
    return 1 + (this.parent?.depth || 0);
  }

  get isRoot(): boolean {
    return this.id === this._tree.root?.id;
  }

  get isLeaf(): boolean {
    return this.numChildren === 0;
  }

  *getChildren() {
    for (let i = 0; i < this.children.length; i += 1) {
      yield this._tree.getNodeById(this.children[i]);
    }
  }
}

export class Tree {
  _size: number = 0;
  _root: TreeNode['id'] | null = null;
  _nodes: Record<TreeNode['id'], TreeNode> = {};

  constructor() {}

  get size(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  get root(): TreeNode | undefined {
    if (this._root === null) {
      return undefined;
    }
    return this._nodes[this._root];
  }

  getNodeById(id: TreeNode['id']): TreeNode {
    return this._nodes[id];
  }

  addNode(element: any, parentId?: TreeNode['id']): TreeNode {
    const newNode = new TreeNode(this, element, parentId);
    this._nodes[newNode.id] = newNode;
    if (parentId) {
      this._nodes[parentId].children.push(newNode.id);
    } else {
      this._root = newNode.id;
    }
    this._size += 1;
    return newNode;
  }

  updateNode(nodeId: TreeNode['id'], element: any) {
    const n = this._nodes[nodeId];
    n.element = element;
    return n;
  }

  preorderTraversal(p: TreeNode, visit: (x: TreeNode) => any) {
    visit(p);
    for (const c of p.getChildren()) {
      this.preorderTraversal(c, visit);
    }
  }

  bfsTraversal(visit: (x: TreeNode) => any) {
    if (!this.root) {
      return;
    }
    const q = [this.root];
    while (q.length !== 0) {
      const cur = q.shift() as TreeNode;
      visit(cur);
      for (const child of cur.getChildren()) {
        q.push(child);
      }
    }
  }

  dfsTraversal(visit: (x: TreeNode) => any, cur: TreeNode) {
    if (!this.root) {
      return;
    }
    visit(cur || this.root);
    for (const child of cur.getChildren()) {
      this.dfsTraversal(visit, child);
    }
  }
}
