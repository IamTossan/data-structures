export class Queue<T> {
  static BASE_CAPACITY = 16;
  _data: Array<T> = new Array(Queue.BASE_CAPACITY);
  _size: number = 0;
  _first: number = 0;

  constructor() {}

  get length(): number {
    return this._size;
  }

  get isEmpty(): boolean {
    return this._size === 0;
  }

  get first(): T {
    if (this.isEmpty) {
      throw new Error('Queue is empty');
    }
    return this._data[this._first];
  }

  private resize(capacity: number) {
    const old = this._data;
    this._data = new Array(capacity);
    for (let i = 0; i < this._size; i += 1) {
      this._data[i] = old[(this._first + i) % this._size];
    }
    this._first = 0;
  }

  enqueue(item: T) {
    if (this._data.length === this._size) {
      this.resize(this._size * 2);
    }
    this._data[(this._first + this._size) % this._data.length] = item;
    this._size += 1;
  }

  dequeue(): T {
    if (this.isEmpty) {
      throw new Error('Queue is empty');
    }
    const res = this.first;
    this._first = (this._first + 1) % this._size;
    this._size -= 1;
    return res;
  }
}
