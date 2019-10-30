import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as compression from 'compression';
import * as express from 'express';
import * as pino from 'express-pino-logger';
import { join } from 'path';

const PORT = parseInt(process.env.PORT, 10) || 80;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
export const app = express();
app.use(compression());
app.use(pino({
  level: process.env.LOG_LEVEL || 'info'
}));

const DIST_FOLDER = join(process.cwd(), 'dist/ds-naranja');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/ds-naranja-server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files from /browser -- js cs
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y',
}));
// return rendered index.html on every request
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {
    req,
    res
  });
});

// start server and listen
app.listen(PORT);
