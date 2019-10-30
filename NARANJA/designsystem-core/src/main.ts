import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => registerServiceWorker())
  .catch(err => console.error(err));
});

function registerServiceWorker() {
  if (environment.production && 'serviceWorker' in navigator) {
    const prefix = ['%cAngular', `background: red; color: white; padding: 2px 0.5em; ` + `border-radius: 0.5em;`];
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => {
        console.log(...prefix, 'Registration successful', reg);
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log(...prefix, 'New or updated content is available', installingWorker);
                } else {
                  console.log(...prefix, 'Content is now available offline', installingWorker);
                }
                break;
              case 'redundant':
                console.log(...prefix, 'The installing service worker became redundant', installingWorker);
                break;
              default:
                console.log(...prefix, installingWorker.state);
                break;
            }
          };
        };
      })
      .catch(e => console.log('Error during service worker registration:', e));
  } else {
    console.log('Service Worker is not supported');
  }
}
