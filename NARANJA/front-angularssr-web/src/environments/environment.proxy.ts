const API_DOMAIN = 'http://localhost:4200';

export const environment = {
  production: false,
  addresses: {
    countries: `${API_DOMAIN}/rest/v2/region/europe`,
    car: `${API_DOMAIN}/bff-insurance-web/info?type=car`,
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
