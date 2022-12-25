import { describe, it, expect } from '@jest/globals';

import { Graph } from '.';

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
});
