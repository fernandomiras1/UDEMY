import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { readFileSync } from 'fs';
import { I18nService } from './i18n.service';

export function universalLoader(transferState: TransferState): TranslateLoader {
  return {
    getTranslation: (lang: string) => {
      return Observable.create((observer: Observer<any>) => {
        const data = JSON.parse(readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8'));
        observer.next(data);
        const key = makeStateKey<any>(`transfer-translate-${lang}`);
        transferState.set(key, data);
        observer.complete();
      });
    },
  } as TranslateLoader;
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: universalLoader,
        deps: [TransferState],
      },
    }),
  ],
  providers: [I18nService],
})
export class I18nServerModule {}
