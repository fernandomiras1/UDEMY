import { ZParser } from './parser';

describe('Parser Test', () => {
  it('should cuil without scripts', () => {
    const cuil = '20-30123432-3';
    const cuilWithoutScripts = '20301234323';
    const value = ZParser.getCuilWithoutScripts(cuil);

    expect(value).toEqual(cuilWithoutScripts);
  });

  it('should cuil when is null or length equal 0', () => {
    const cuil = '';
    const value = ZParser.getCuilWithoutScripts(cuil);

    expect(value).toEqual(undefined);
  });

  it('should isNumber when is number', () => {
    const value = 123;
    const parserValue = ZParser.isNumber(value);

    expect(parserValue).toEqual(true);
  });

  it('should convert string to number', () => {
    const value = '23131';
    const value2 = 23131;
    const parserValue = ZParser.toNumber(value);

    expect(parserValue).toEqual(value2);
  });

  it('should convert string to upper', () => {
    const value = 'home';
    const parseValue = ZParser.toUpper(value);

    expect(parseValue).toEqual(value.toUpperCase());
  });

  it('should convert string to low', () => {
    const value = 'home';
    const parseValue = ZParser.toLowcase(value);

    expect(parseValue).toEqual(value.toLowerCase());
  });

  it('should convert string to date', () => {
    const value = '2016-02-22T00:00:00';
    const parseValue = ZParser.convertToDate(value);
    expect(parseValue).toBeTruthy();
  });

  it('should convert incorrect string to date', () => {
    const value = '2016-02-22';
    const parseValue = ZParser.convertToDate(value);
    expect(parseValue).toEqual(undefined);
  });
});
