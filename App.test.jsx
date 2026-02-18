import { describe, it, expect } from 'vitest';

describe('Basic App Check', () => {
  it('should pass a simple truthy test', () => {
    expect(true).toBe(true);
  });

  it('should verify that 1 + 1 is 2', () => {
    expect(1 + 1).toBe(2);
  });
});
