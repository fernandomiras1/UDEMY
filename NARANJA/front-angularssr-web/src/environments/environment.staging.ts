const API_DOMAIN = '';

export const environment = {
  production: true,
  addresses: {
    countries: 'https://restcountries.eu/rest/v2/region/europe',
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
