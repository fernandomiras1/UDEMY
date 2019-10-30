import { ZDatePipe } from './date.pipes';

describe('Pipe: ZDatePipe', () => {

  const pipe = new ZDatePipe();

  it('should directive valid', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should directive valid', () => {
    expect(pipe.transform('20031999')).toEqual('20/03/1999');
  });
});
