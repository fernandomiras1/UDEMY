import {
  Injectable,
  Renderer2,
  RendererFactory2, Type,
} from '@angular/core';
import * as domino from 'domino';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root',
})
export class DominoHelperService {
  window: Window;
  document: Document;
  renderer: Renderer2;
  constructor(private rendererFactory: RendererFactory2,
              private documentService: DocumentService) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.createWindow();
    this.createDocument();
    this.documentService.setNativeDocument(this.document);
  }

  createWindow(): Window {
    this.window = domino.createWindow();
    return this.window;
  }

  createDocument(): Document {
    this.document = domino.createDocument();
    return this.document;
  }

  getDocument(): Document {
    return this.document;
  }

  getWindow(): Window {
    return this.window;
  }

  addElementTo(element: any, parentElement = 'body'): any {
    const parent = this.document.querySelector(parentElement);
    const newElement = this.document.createElement(element);
    this.renderer.appendChild(parent, newElement);
    return this;
  }

  childNodesTo(parentElement = 'body'): any {
    return this.document.querySelector(parentElement).childNodes;
  }

  getBody(): any {
    return this.document.childNodes[1].childNodes[1] as HTMLBodyElement;
  }
}
