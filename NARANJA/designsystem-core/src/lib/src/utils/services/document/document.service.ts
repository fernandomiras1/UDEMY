import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable()
export class DocumentService {
  private _document: Document;
  constructor(@Inject(PLATFORM_ID) platformId: any, @Inject(DOCUMENT) private document: any) {
    if (!isPlatformBrowser(platformId)) {
      this._document = <any>{
        getElementById: (id: string) => new HTMLElement(),
        getElementsByClassName: (className: string) => new HTMLCollection(),
        getElementsByName: (name: string) => new NodeList(),
        getElementsByTagName: (name: string) => new NodeList(),
        documentElement: () => new HTMLElement(),
        body: () => new HTMLBodyElement()
      } as Document;
    } else {
      this._document = this.document;
    }
  }

  get nativeDocument(): Document {
    return this._document;
  }
}
