import { describe, it, expect } from '@jest/globals';

import { Queue } from '.';

describe('Queue', () => {
  it('should create a Queue', () => {
    const queue = new Queue();

    expect(queue).toBeInstanceOf(Queue);
  });

  it('should return 0', () => {
    const queue = new Queue();

    expect(queue.length).toEqual(0);
  });

  it('should throw an error', () => {
    const queue = new Queue();

    expect(() => queue.first).toThrowError();
  });

  it('should enqueue', () => {
    const queue = new Queue();
    expect(queue.length).toEqual(0);

    queue.enqueue(10);

    expect(queue.length).toEqual(1);
    expect(queue.first).toEqual(10);
  });

  it('should dequeue', () => {
    const queue = new Queue();
    queue.enqueue(10);
    expect(queue.length).toEqual(1);

    const actualResponse = queue.dequeue();

    expect(queue.length).toEqual(0);
    expect(actualResponse).toEqual(10);
  });
});
