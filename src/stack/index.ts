export class Stack<T> {
  _data: Array<T> = [];

  get length(): number {
    return this._data.length;
  }

  get isEmpty(): boolean {
    return this._data.length === 0;
  }

  get top(): T | null {
    if (this.length === 0) {
      return null;
    }
    return this._data[this._data.length - 1];
  }

  push(item: T) {
    this._data.push(item);
  }

  pop(): T | undefined {
    if (this.isEmpty) {
      throw new Error('Stack is empty');
    }

    return this._data.pop();
  }
}
