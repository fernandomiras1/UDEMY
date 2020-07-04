import { Component } from '@angular/core';

@Component({
  selector: 'app-callback',
  template: `
    <div class="login-container">
      <z-loading type="primary" size="extra-large"></z-loading>
    </div>
  `,
  styles: [
    `
    :host {
      position: fixed;
      z-index: 999;
      overflow: visible;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: white;
    }
    .login-container {
      height: 100%;
    }
    .login-container:before {
      content: '';
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.2);
    }
    .login-container:not(:required) {
      /* hide "loading..." text */
      font: 0/0 a;
      color: transparent;
      text-shadow: none;
      background-color: transparent;
      border: 0;
    }
    `,
  ],
})
export class CallbackComponent  {}
