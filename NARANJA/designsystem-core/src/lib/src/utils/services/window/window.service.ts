import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class WindowService {
  private _window: Window;
  constructor(@Inject(PLATFORM_ID) platformId: any) {
    if (!isPlatformBrowser(platformId)) {
      this._window = {
        navigator: { userAgent: 'WIP' },
        getComputedStyle: (element, pseudoElt) => new Object()
      } as Window;
    } else {
      this._window = window;
    }
  }

  get nativeWindow(): any {
    return this._window;
  }
}
