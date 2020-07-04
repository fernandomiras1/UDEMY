import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';
import { reducers, metaReducers, CustomSerializer } from './root-store.reducer';
import { RootEffects } from './root-store.effects';

const devMiddleware = [];

if (!environment.production) {
  devMiddleware.push(StoreDevtoolsModule.instrument());
}
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([RootEffects]),
    StoreRouterConnectingModule,
    ...devMiddleware,
  ],
  exports: [StoreModule],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
  ],
})
export class RootStoreModule { }
