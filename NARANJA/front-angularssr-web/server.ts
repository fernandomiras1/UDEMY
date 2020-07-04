import 'reflect-metadata';
import 'zone.js/dist/zone-node';

// ssr DOM
const domino = require('domino');
const fs = require('fs');
const path = require('path');
// index from browser build!
const template = fs.readFileSync(path.join(process.cwd(), 'dist/browser', 'index.html')).toString();
// for mock global window by domino
const win = domino.createWindow(template);
// from server build
const files = fs.readdirSync(`${process.cwd()}/dist/server`);
// mock
global['window'] = win;
global['navigator'] = win.navigator;
global['sessionStorage'] = {
  getItem (key) {
    return this[key];
  },
  setItem (key, value) {
    this[key] = value;
  },
  removeItem(key) {
    delete this[key];
  },
};
// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
// mock documnet
global['document'] = win.document;
// othres mock
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as express from 'express';
import { join } from 'path';

const PORT = parseInt(process.env.PORT, 10) || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
export const app = express();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP),
  ],
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('service-worker.js', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'service-worker.js'), {
    headers: {
      'Cache-Control': 'public, max-age=0',
    },
  });
});

app.get('manifest.json', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'manifest.json'), {
    headers: {
      'Cache-Control': 'public, max-age=0',
    },
  });
});

app.get('sitemap.xml', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'manifest.json'), {
    headers: {
      'Cache-Control': 'public, max-age=0',
    },
  });
});

// Serve static files from /browser -- js cs
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y',
}));
// return rendered index.html on every request
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  const serverUrl = process.env.API_URL ? process.env.API_URL : `${req.protocol}://${req.get('host')}`;
  res.set('Cache-Control', 'public, max-age=600');
  res.render('index', {
    req,
    res,
    providers: [
      {
        provide: 'userAgent',
        useValue: req.get('User-Agent'),
      },
      {
        provide: 'serverUrl',
        useValue: serverUrl,
      },
    ],
  });
});

// start server and listen
const server = app.listen(PORT);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(<NodeJS.Signals> signal, shutdown);
}

function shutdown() {
  server.close(err => {
    if (err) {
      process.exitCode = 1;
    }
    process.exit();
  });
}
