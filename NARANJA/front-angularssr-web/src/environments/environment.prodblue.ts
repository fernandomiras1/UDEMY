const API_DOMAIN = '';

export const environment = {
  production: true,
  addresses: {
    countries: 'https://restcountries.eu/rest/v2/region/europe',
  },
  auth0: {
    domain: 'naranja-users.auth0.com',
    clientID: 'erChKNw0yObKtDzsNgh3rqfXmbJs2mSz',
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
