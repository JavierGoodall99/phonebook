process.env.NODE_ENV = 'test';

describe('Setup', () => {
  it('should set NODE_ENV to test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});
