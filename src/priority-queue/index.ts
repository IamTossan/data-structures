export class PriorityQueue {
  _data: Array<[number, any]> = [];

  get length(): number {
    return this._data.length;
  }

  get min() {
    return this._data[0];
  }

  private _parentIdx(j: number) {
    return Math.floor((j - 1) / 2);
  }

  private _leftIdx(j: number) {
    return j * 2 + 1;
  }

  private _hasLeft(j: number) {
    return this._leftIdx(j) < this.length;
  }

  private _rightIdx(j: number) {
    return j * 2 + 2;
  }

  private _hasRight(j: number) {
    return this._rightIdx(j) < this.length;
  }

  private _upheap(j: number) {
    const parentIdx = this._parentIdx(j);
    if (j > 0 && this._data[j][0] < this._data[parentIdx][0]) {
      [this._data[j], this._data[parentIdx]] = [
        this._data[parentIdx],
        this._data[j],
      ];
      this._upheap(parentIdx);
    }
  }

  private _downheap(j: number) {
    if (!this._hasLeft(j)) {
      return;
    }

    const targetChildIdx: number =
      this._hasRight(j) &&
      this._data[this._rightIdx(j)][0] < this._data[this._leftIdx(j)][0]
        ? this._rightIdx(j)
        : this._leftIdx(j);

    if (this._data[j][0] > this._data[targetChildIdx][0]) {
      [this._data[j], this._data[targetChildIdx]] = [
        this._data[targetChildIdx],
        this._data[j],
      ];
    }
    this._downheap(targetChildIdx);
  }

  add(key: number, value: any) {
    this._data.push([key, value]);
    this._upheap(this.length - 1);
  }

  removeMin() {
    [this._data[0], this._data[this.length - 1]] = [
      this._data[this.length - 1],
      this._data[0],
    ];
    const min = this._data.pop();
    this._downheap(0);
    return min;
  }
}
