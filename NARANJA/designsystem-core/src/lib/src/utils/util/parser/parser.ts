export class ZParser {

  private static REGEX_ISO: RegExp = /(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})/;

  public static getCuilWithoutScripts(cuil: string): string {
    if (!cuil || cuil == null || cuil.length === 0) {
      return undefined;
    }
    return cuil.replace(new RegExp('-', 'g'), '');
  }

  public static isNumber(value: any): boolean {
    return !isNaN(ZParser.toInteger(value));
  }

  public static toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  public static toNumber(value: any): number {
    return Number(value);
  }

  public static toUpper(value: string): string {
    return value.toUpperCase();
  }

  public static toLowcase(value: string): string {
    return value.toLowerCase();
  }

  public static convertToDate(date: string): Date {
    let match;
    if (ZParser.isISODate(date)) {
      match = date.match(this.REGEX_ISO);
      const now = new Date();
      const tzo = -now.getTimezoneOffset();
      const dif = tzo >= 0 ? '+' : '-';
      const pad = function (num) {
        const norm = Math.abs(Math.floor(num));
        return (norm < 10 ? '0' : '') + norm;
      };

      let dateMatch = match[0];

      if (dateMatch.search(/[-+]([0-9][0-9]):([0-9][0-9])/i) === -1) {
        dateMatch += `${dif + pad(tzo / 60)}:${pad(tzo % 60)}`;
      }
      const milliseconds = Date.parse(dateMatch);
      if (milliseconds) {
        return new Date(milliseconds);
      }
    }
  }

  static isISODate(date: string): boolean {
    return (date && typeof date === 'string' && date.match(this.REGEX_ISO) != null);
  }
}
