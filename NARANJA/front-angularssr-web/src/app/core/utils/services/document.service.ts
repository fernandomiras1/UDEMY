import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as domino from 'domino';

@Injectable()
export class DocumentService {
  private _document: Document;
  constructor(@Inject(PLATFORM_ID) platformId: any) {
    if (!isPlatformBrowser(platformId)) {
      this._document = <any>{
        getElementById: (id: string) => new HTMLElement(),
        getElementsByClassName: (className: string) => new HTMLCollection(),
        getElementsByName: (name: string) => new NodeList(),
        getElementsByTagName: (name: string) => new NodeList(),
        documentElement: () => new HTMLElement(),
        body: () => new HTMLBodyElement(),
      } as Document;
    } else {
      this._document = window.document;
    }
  }

  get nativeDocument(): Document {
    return this._document;
  }

  setNativeDocument(doc: any): void {
    this._document = doc;
  }
}
