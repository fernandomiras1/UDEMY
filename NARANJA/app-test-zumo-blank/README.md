# AppTestZumoBlank

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Installar report performance

https://alligator.io/angular/angular-webpack-bundle-analyzer/


Instalamos la libreria: npm i webpack-bundle-analyzer -D

"scripts": {
  "build:stats": "ng build --prod --stats-json && webpack-bundle-analyzer dist/app-test-zumo-blank/stats-es2015.json",
}

$ npm run build:stats


"scripts": {
  "analyze": "webpack-bundle-analyzer dist/AngularBundleAnalyser/stats.json"
}