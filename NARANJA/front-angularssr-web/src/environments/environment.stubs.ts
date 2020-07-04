// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// This is using stubs addresses
export const environment = {
  production: false,
  addresses: {
    countries: 'http://localhost:8882/rest/v2/region/europe',
  },
  auth0: {
    domain: 'naranja-users-e3.auth0.com',
    clientID: 'oxBYnXYEuVYBPyy4JgcEbBQAnZYimV26',
    audience: 'https://naranja.com/nonline/api',
    scope: 'openid profile email write.self',
    urlRedirectAfterCallback: '/',
    urlRedirectUnauthorized: '/unauthorized',
    urlRedirectAfterLogin: '/callback',
    urlRedirectAfterLogout: '/',
  },
  seo: {
    gtmId : 'GTM-T9B7BT2',
    gtmSecretKey: '',
    logging : true,
    canonicalDomain: 'https://www.naranja.com',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
