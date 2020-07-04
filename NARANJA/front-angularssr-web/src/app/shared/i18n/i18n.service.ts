import { Injectable, Optional, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';
import * as _ from 'lodash';

@Injectable()
export class I18nService {
  defaultLanguage = 'es';
  allowedLanguages = ['es', 'en'];
  language = this.getLanguage();

  constructor(
      private translate: TranslateService,
      @Optional() @Inject(REQUEST) private req: Request,
      @Inject(PLATFORM_ID) private platform: any,
  ) {}

  init(): Promise<any> {
    return new Promise((resolve: Function) => {
      this.translate.addLangs(this.allowedLanguages);
      this.translate.setDefaultLang(this.defaultLanguage);
      this.translate.use(this.defaultLanguage); // this.translate.use(this.language);
      resolve();
    });
  }
  getLanguage(): string {
    let intersection;
    if (isPlatformBrowser(this.platform)) {
      intersection = _.intersection(
        this.allowedLanguages,
        _.reduce(navigator.languages, (res = [], k) => {
          if (res.indexOf(_.toLower(k.substring(0, 2))) === -1) {
            res.push(_.toLower(k.substring(0, 2)));
          }
          return res;
        },       []),
      );
    } else {
      intersection = _.intersection(this.allowedLanguages, [(this.req.headers['accept-language'] || '').substring(0, 2)]);
    }
    return this.processLanguage(intersection);
  }

  processLanguage(intersection) {
    let lang;
    if (intersection.length && intersection.indexOf(this.defaultLanguage) !== -1) {
      lang = this.defaultLanguage; // if the browser support the default we retrieve it.
    } else {
      lang = intersection[0] || this.defaultLanguage; // return the first, if the array is empty return default
    }
    return lang;
  }
}
