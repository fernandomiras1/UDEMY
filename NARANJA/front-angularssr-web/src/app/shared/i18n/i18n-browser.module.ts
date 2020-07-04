import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { I18nService } from './i18n.service';
import { Observable, of } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslatesBrowserLoaderService implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private http: HttpClient,
    private prefix: string = './assets/i18n/',
    private suffix: string = '.json',
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const key = makeStateKey<any>(`transfer-translate-${lang}`);
    const data: any = this.transferState.get(key, null);
    // First we are looking for the translations in transfer-state, if none found, http load as fallback
    return data
      ? of(data)
      : new TranslateHttpLoader(this.http, this.prefix, this.suffix).getTranslation(lang);
  }
}

export function translateStaticLoader(
  http: HttpClient,
  transferState: TransferState,
): TranslatesBrowserLoaderService {
  return new TranslatesBrowserLoaderService(transferState, http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateStaticLoader,
        deps: [HttpClient, TransferState],
      },
    }),
  ],
  providers: [I18nService],
})
export class I18nBrowserModule {
  constructor(private _i18nService: I18nService) {
    this._i18nService.init();
  }
}
