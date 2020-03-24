# AngularSchoolC6

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

This course is made of an angular app, that will evolve along the chapters, and a FAKE data server, made with [JSON server](https://github.com/typicode/json-server).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Fake data server

Run `node server/server.js` to launch the fake data server in `http://localhost:3000`.
The data is served and stored in: `server/db.json`.

The endpoints available are:
* `contacts`
* `contacts/{id}`
* `users`
* `users/{id}`

Any request should be made setting a bearer token authentication in the request headers, matching the auth token of some of the users in database (for example `Authorization: Bearer 1234567890`).

## Artwork atribution
* Pen icon made by [Icongeek26](https://www.flaticon.com/authors/icongeek26) from www.flaticon.com
* Garbage icon made by [Anatoly](https://www.flaticon.com/authors/anatoly) from www.flaticon.com


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
