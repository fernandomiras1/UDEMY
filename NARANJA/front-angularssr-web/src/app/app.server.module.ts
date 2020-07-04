import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptor } from './universal.interceptor';
import { I18nServerModule } from './shared/i18n/i18n-server.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    I18nServerModule,
    ModuleMapLoaderModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UniversalInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
