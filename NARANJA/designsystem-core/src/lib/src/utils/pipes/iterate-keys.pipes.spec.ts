import { ZIterateKeys } from './iterate-keys.pipes';

describe('Pipe: ZIterateKeys', () => {

  const pipe = new ZIterateKeys();

  it('should directive valid', () => {
    expect(pipe.transform('')).toBe(null);
  });

  it('should directive valid', () => {
    expect(pipe.transform({ a: 1 , b: 2 })).toEqual(['a', 'b']);
  });
});
