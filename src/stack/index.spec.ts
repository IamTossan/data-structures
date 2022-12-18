import { describe, it, expect } from '@jest/globals';

import { Stack } from '.';

describe('Stack', () => {
  it('should create a Stack', () => {
    const stack = new Stack();

    expect(stack).toBeInstanceOf(Stack);
  });

  it('should return 0', () => {
    const stack = new Stack();

    expect(stack.length).toEqual(0);
  });

  it('should return null', () => {
    const stack = new Stack();

    expect(stack.top).toBeNull();
  });

  it('should add an item', () => {
    const stack = new Stack();
    expect(stack.length).toEqual(0);
    expect(stack.top).toBeNull();

    stack.push(10);

    expect(stack.length).toEqual(1);
    expect(stack.top).toEqual(10);
  });

  it('should remove an item', () => {
    const stack = new Stack();
    stack.push(10);
    expect(stack.length).toEqual(1);
    expect(stack.top).toEqual(10);

    const actualResult = stack.pop();

    expect(stack.length).toEqual(0);
    expect(stack.top).toBeNull();
    expect(actualResult).toEqual(10);
  });
});
