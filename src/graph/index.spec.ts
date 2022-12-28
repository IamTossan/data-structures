import { describe, it, expect } from '@jest/globals';

import { Graph, Vertex } from '.';

describe('Graph', () => {
  it('should create an empty Graph', () => {
    const graph = new Graph();

    expect(graph).toBeInstanceOf(Graph);
    expect(graph.vertexCount).toEqual(0);
    expect(graph.edgeCount).toEqual(0);
  });

  it('should add a vertex', () => {
    const graph = new Graph();
    expect(graph.vertexCount).toEqual(0);

    const v1 = graph.addVertex('lol');

    expect(graph.vertexCount).toEqual(1);
    expect(graph.vertices).toEqual([v1]);
  });

  it('should add an edge', () => {
    const graph = new Graph();
    const v1 = graph.addVertex('lol');
    const v2 = graph.addVertex('lul');
    expect(graph.edgeCount).toEqual(0);

    const e1 = graph.addEdge(v1.id, v2.id);

    expect(graph.edgeCount).toEqual(1);
    expect(graph.edges).toEqual([e1]);
  });

  it('should dfs', () => {
    const graph = new Graph<string, unknown>();
    const v1 = graph.addVertex('lol-1');
    const v2 = graph.addVertex('lul-2');
    const v3 = graph.addVertex('lul-3');
    const v4 = graph.addVertex('lul-4');
    const v5 = graph.addVertex('lul-5');
    const v6 = graph.addVertex('lul-6');

    const e1 = graph.addEdge(v1.id, v2.id);
    const e2 = graph.addEdge(v1.id, v3.id);
    const e3 = graph.addEdge(v2.id, v4.id);
    const e4 = graph.addEdge(v2.id, v5.id);
    const e5 = graph.addEdge(v3.id, v6.id);

    const visitedNodes: Vertex<string>[] = [];
    graph.dfsTraversal(v1, (x) => visitedNodes.push(x));

    expect(visitedNodes.indexOf(v1)).toEqual(0);
    expect(visitedNodes.indexOf(v2)).toBeGreaterThan(visitedNodes.indexOf(v1));
    expect(visitedNodes.indexOf(v3)).toBeGreaterThan(visitedNodes.indexOf(v1));
    expect(visitedNodes.indexOf(v4)).toBeGreaterThan(visitedNodes.indexOf(v2));
    expect(visitedNodes.indexOf(v5)).toBeGreaterThan(visitedNodes.indexOf(v2));
    expect(visitedNodes.indexOf(v6)).toBeGreaterThan(visitedNodes.indexOf(v3));
  });
});
