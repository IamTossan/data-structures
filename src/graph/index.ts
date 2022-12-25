import { v4 as uuidv4 } from 'uuid';

export class Vertex<T> {
  _id: string;
  _element: T;

  constructor(e: T) {
    this._id = uuidv4();
    this._element = e;
  }

  get id() {
    return this._id;
  }

  get element() {
    return this._element;
  }
}

export class Edge<T, U> {
  _id: string;
  _element: U | null;
  _origin: Vertex<T>['id'];
  _destination: Vertex<T>['id'];

  constructor(
    origin: Vertex<T>['id'],
    destination: Vertex<T>['id'],
    element?: U,
  ) {
    this._id = uuidv4();
    this._element = element || null;
    this._origin = origin;
    this._destination = destination;
  }

  get id() {
    return this._id;
  }
}

export class Graph<T, U> {
  _isDirected: boolean;
  _vertices: Record<Vertex<T>['id'], Vertex<T>> = {};
  _edges: Record<Edge<T, U>['id'], Edge<T, U>> = {};
  _outgoing: Record<Vertex<T>['id'], Record<Vertex<T>['id'], Edge<T, U>>> = {};
  _incoming: Record<Vertex<T>['id'], Record<Vertex<T>['id'], Edge<T, U>>> = {};

  constructor({ isDirected }: { isDirected: boolean } = { isDirected: false }) {
    this._isDirected = isDirected;
  }

  get vertexCount(): number {
    return Object.keys(this._vertices).length;
  }

  get edgeCount(): number {
    return Object.keys(this._edges).length;
  }

  get vertices() {
    return Object.values(this._vertices);
  }

  get edges() {
    return Object.values(this._edges);
  }

  addVertex(e: T) {
    const v = new Vertex(e);
    this._vertices[v.id] = v;
    return v;
  }

  addEdge(origin: Vertex<T>['id'], destination: Vertex<T>['id'], element?: U) {
    const e = new Edge(origin, destination, element);

    if (!this._outgoing[origin]) this._outgoing[origin] = {};
    if (!this._incoming[destination]) this._incoming[destination] = {};

    this._outgoing[origin][destination] = e;
    this._incoming[destination][origin] = e;
    this._edges[e.id] = e;
    return e;
  }
}
