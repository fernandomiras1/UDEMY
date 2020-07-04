import { Component } from '@angular/core';

@Component({
  selector: 'app-login-unauthorized',
  styles: [
    `
    :host {
      align-items: center;
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: center;
    }
    `,
  ],
  template: `
    <p class="z-subtitle center-xxs margin-top-32 margin-bottom-32">  {{ 'PAGES.UNAUTHORIZED' | translate }} </p>
  `,
})
export class UnauthorizedComponent {}
