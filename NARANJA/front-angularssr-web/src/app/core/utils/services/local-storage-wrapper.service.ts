import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageWrapper {
  private localStorageRef;

  constructor(@Inject(PLATFORM_ID) platformId) {
    if (isPlatformBrowser(platformId)) {
      this.localStorageRef = localStorage;
    } else {
      this.localStorageRef = {
        clear: () => { },
        getItem: (key: string) => undefined as string,
        key: (index: number) => undefined as string,
        removeItem: (key: string) => { },
        setItem: (key: string, value: string) => { },
        length: 0,
      };
    }
  }

  get localStorage() {
    return this.localStorageRef;
  }
}
