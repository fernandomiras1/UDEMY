import { Injectable } from '@angular/core';
import { SeoGtmService } from '../../utils/services/seo-gtm.service';

enum AuthType {
  auth0 = 'auth0',
  onPremise = 'onPremise',
}

@Injectable()
export class AuthenticationUtilsService {
  constructor(
    private _seoGtm: SeoGtmService,
  ) {}
  /**
   * Sets the token credentials.
   * The credentials may be persisted across sessions.
   * @param accessToken Auth0 accessToken.
   */
  public parseToken(accessToken): Object {
    const tokenAuth = this.parseJwt(accessToken);
    const { exp = 1 }  = tokenAuth;
    const expiresAt = exp * 1000;
    const { ownerId, loggedUserId, role } = tokenAuth['https://naranja.com/info'];
    const userType = (ownerId !== loggedUserId) ?
      'AUT' : loggedUserId
        ? 'TIT' : null;
    const tokenType = tokenAuth['https://naranja.com/info'] ? AuthType.auth0 : AuthType.onPremise;
    return {
      expiresAt,
      tokenType,
      userType,
      accountId: ownerId,
      loggedId: loggedUserId,
      loggedIdEncode : btoa(loggedUserId),
      roles: [
        (role) ? role : userType,
      ],
    };
  }

  public pushSignInEvent(data: any) {
    this._seoGtm.pushToDataLayer({
      event: 'signIn',
      userId: data.loggedIdEncode,
      userType: data.userType,
    });
  }

  public pushAuthEvent(data: any) {
    this._seoGtm.pushToDataLayer({
      event: 'authentication',
      userId: data.loggedIdEncode,
      userType: data.userType,
    });
  }

  /**
   * Decode Token
   * @returns The payload or null
   */
  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64)) || null;
  }
}
