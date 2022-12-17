import { v4 as uuidv4 } from 'uuid';

export enum NodeType {
  ROOT = 'ROOT',
  DISCIPLINE = 'DISCIPLINE',
  COURSE = 'COURSE',
  TEACHER = 'TEACHER',
}

type Node<NodeType> = {
  // PK of the node
  id: string;
  // ID to identify a node across versions
  slug: string;
  // Displayed name of the node
  name: string;
  // Type of the node (correlated to the depth of the tree)
  type: NodeType;
  // IDs of children nodes
  content: Array<Node<NodeType>['id']>;
};

type NodeId = Node<NodeType>['id'];
type ProgramStructure = Record<NodeId, Node<NodeType>>;

export class Program {
  private _nodes: ProgramStructure = {};
  private _roots: string[];

  constructor(programStructure?: {
    nodes: ProgramStructure;
    roots: Array<NodeId>;
  }) {
    const newUuid = uuidv4();
    this._roots = programStructure?.roots || [newUuid];
    this._nodes = programStructure?.nodes || {
      [newUuid]: {
        id: this.roots[this.roots.length - 1],
        type: NodeType.ROOT,
        name: 'program',
        slug: 'program',
        content: [],
      },
    };
  }

  get root() {
    return this.roots[this.roots.length - 1];
  }

  get roots() {
    return this._roots;
  }

  listNodes(opts?: {
    filterByType?: NodeType;
    rootId?: Node<NodeType.ROOT>['id'];
  }) {
    const rootId = opts?.rootId || this.root;
    const nodes = [this._nodes[rootId]];
    const queue = [rootId];

    while (queue.length !== 0) {
      const currentNodeId = queue.shift() as NodeId;
      nodes.push(
        ...this._nodes[currentNodeId].content.map((id) => this._nodes[id]),
      );
      queue.push(...this._nodes[currentNodeId].content);
    }

    return nodes.filter(
      (n) => !opts?.filterByType || n.type === opts.filterByType,
    );
  }

  dfs(
    targetId: NodeId,
    nextId: NodeId,
    currentPath: NodeId[] = [],
  ): NodeId[] | null {
    const newPath = [...currentPath, nextId];
    if (nextId === targetId) {
      return newPath;
    }
    for (let i of this._nodes[nextId].content) {
      const traversalResult = this.dfs(targetId, i, newPath);
      if (traversalResult !== null) {
        return traversalResult;
      }
    }
    return null;
  }

  getPathById(id: NodeId) {
    return this.dfs(id, this.root);
  }

  getNodeById(id: NodeId) {
    return this._nodes[id];
  }

  addNode(
    newNode: Pick<Node<NodeType>, 'name' | 'type' | 'slug'>,
    parentId?: NodeId,
  ) {
    const path = this.getPathById(parentId || this.root);

    if (!path) {
      throw new Error('parentId does not exist');
    }

    const newNodeIds = [...path, null].map((oldId): [NodeId | null, NodeId] => [
      oldId,
      uuidv4(),
    ]);
    const [[, newRootId]] = newNodeIds;
    const newNodes = newNodeIds.reduce((acc, [oldId, newId], idx, arr) => {
      // new node case
      if (!oldId) {
        return {
          ...acc,
          [newId]: {
            ...newNode,
            id: newId,
            content: [],
          },
        };
      }
      // copy of existing node case
      const [nextOldId, nextNewId] = arr[idx + 1];
      const oldContent = this._nodes[oldId].content;
      return {
        ...acc,
        [newId]: {
          ...this._nodes[oldId],
          id: newId,
          content:
            nextOldId === null
              ? [...oldContent, nextNewId]
              : [
                  ...oldContent.slice(0, oldContent.indexOf(nextOldId)),
                  nextNewId,
                  ...oldContent.slice(oldContent.indexOf(nextOldId) + 1),
                ],
        },
      };
    }, {});

    return new Program({
      nodes: {
        ...this._nodes,
        ...newNodes,
      },
      roots: [...this.roots, newRootId],
    });
  }
}
