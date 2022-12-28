import { describe, it, expect } from '@jest/globals';

import { PriorityQueue } from '.';

describe('PriorityQueue', () => {
  it('should create an empty PriorityQueue', () => {
    const priorityQueue = new PriorityQueue();

    expect(priorityQueue).toBeInstanceOf(PriorityQueue);
    expect(priorityQueue.length).toEqual(0);
  });

  it('should add an element', () => {
    const priorityQueue = new PriorityQueue();
    priorityQueue.add(3, 'lol');

    expect(priorityQueue.min).toEqual([3, 'lol']);
  });

  it('should update the min value', () => {
    const priorityQueue = new PriorityQueue();
    priorityQueue.add(3, 'lol');
    priorityQueue.add(1, 'lul');

    expect(priorityQueue.min).toEqual([1, 'lul']);
  });

  it('should remove the min value', () => {
    const priorityQueue = new PriorityQueue();
    priorityQueue.add(3, 'lol-3');
    priorityQueue.add(1, 'lul-1');
    priorityQueue.add(4, 'lul-4');
    priorityQueue.add(10, 'lul-10');
    priorityQueue.add(2, 'lul-2');
    priorityQueue.add(6, 'lul-6');

    expect(priorityQueue.removeMin()).toEqual([1, 'lul-1']);
    expect(priorityQueue.removeMin()).toEqual([2, 'lul-2']);
    expect(priorityQueue.removeMin()).toEqual([3, 'lol-3']);
    expect(priorityQueue.removeMin()).toEqual([4, 'lul-4']);
    expect(priorityQueue.removeMin()).toEqual([6, 'lul-6']);
    expect(priorityQueue.removeMin()).toEqual([10, 'lul-10']);
  });
});
