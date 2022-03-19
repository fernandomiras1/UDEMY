import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseUrl',
})
export class ParseUrlPipe implements PipeTransform {
  readonly pattern =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

  transform(text: string): any {
    if (!text) {
      return text;
    }

    return this.parseUrl(text);
  }

  private parseUrl(text: string): string {
    // Find/Replace URL's in text
    if (text.match(this.pattern)) {
      text = text.replace(this.pattern, this.replacer);
    }

    return text;
  }

  private replacer(url: string): string {
    const pattern = /^((http|https|ftp):\/\/)/;

    const newUrl = !pattern.test(url) ? `https://${url}` : url;

    return `<a href="${newUrl}" rel="noopener noreferrer" target="_blank">${url}</a>`;
  }
}
