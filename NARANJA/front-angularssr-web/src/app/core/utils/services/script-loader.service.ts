import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentService } from './document.service';

export interface ScriptModel {
  name: string;
  src: string;
  loaded?: boolean;
  htmlParentElement?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private scripts: ScriptModel[] = [];

  constructor(private documentService: DocumentService) {
  }

  public load(script: ScriptModel): Observable<ScriptModel> {
    return new Observable((observer) => {
      const existingScript = this.scripts.find(s => s.name === script.name);

      // Complete if already loaded
      if (existingScript && existingScript.loaded) {
        observer.next(existingScript);
      } else {
        this.scripts = [...this.scripts, script];
        // create the script
        const scriptElement = this.documentService.nativeDocument.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = script.src;

        scriptElement.onload = () => {
          script.loaded = true;
          observer.next(script);
        };

        scriptElement.onerror = (error: any) => {
          observer.error(`Couldn\'t load script  ${script.src}: \n ${error}`);
        };
        const injectTag = script.htmlParentElement || 'body';
        this.documentService.nativeDocument
          .getElementsByTagName(injectTag)[0].appendChild(scriptElement);
      }
    });
  }
}
