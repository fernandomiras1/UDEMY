
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {renderModuleFactory} from '@angular/platform-server';
import * as express from 'express';
import { readFileSync } from 'fs';
import { enableProdMode } from '@angular/core';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist-server/main');

enableProdMode();

const app = express();

const distFolder = __dirname + '/dist';

// ngExpressEngine: Este es un motor expreso para ejecutar aplicaciones
// angulares en el servidor para la representación del lado del servidor.

// Configura la aplicación del motor
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory, // Dale un módulo para arrancar
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  }));

app.set('view engine', 'html');
// espicifamos todos los pat que va a tener. Multiples rutas
app.set('views', distFolder);

// /**/*; all http resquest
app.get('*.*', express.static(distFolder, {
    maxAge: '1y'
}));


app.listen(9000, () => {
    console.log(`Angular Universal Node Express server listening on http://localhost:9000`);
});





