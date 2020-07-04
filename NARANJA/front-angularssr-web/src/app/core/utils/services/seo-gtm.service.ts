import { Injectable } from '@angular/core';
import * as cryptoJs from 'crypto-js';
import { environment } from '../../../../environments/environment';
/* istanbul ignore next */
@Injectable({
  providedIn: 'root',
})
export class SeoGtmService {
  private readonly logging = environment.seo.logging;

  /**
   * This method load the script gtm in the header of page
   *
   * @param gtmId The id from google tag manager
   */
  loadGTMById(gtmId) {
    /* tslint:disable */
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
                  'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
                });
      var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      // @ts-ignore
      j.async = true;
      // @ts-ignore
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', gtmId);
  }

  /* tslint:enable */

  /**
   * This method is used to sent the information to dataLayer
   * @param dataLayer Object
   */
  pushToDataLayer(dataLayer) {
    try {
      (<any>window).dataLayer.push(dataLayer);
    } catch (ex) {
      if (this.logging) {
        console.error(ex);
        console.error(`tracking failed - make sure you installed the scripts`);
      }
    }
  }

  /**
   * Push an empty object in gtm
   */
  clean() {
    this.pushToDataLayer({});
  }

  /**
   * Encrypt the information that we set into the dataLayer
   * @param data
   * @returns String
   */
  encryptData(data) {
    return cryptoJs.AES.encrypt(data.toString(), environment.seo.gtmSecretKey).toString();
  }

  /**
   * Decrypt the information
   *
   * @param data
   * @returns String
   */
  decryptData(data) {
    return cryptoJs.AES.decrypt(data, environment.seo.gtmSecretKey).toString(cryptoJs.enc.Utf8);
  }
}
