import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { RootStoreModule } from './root-store/root-store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { CallbackComponent } from './pages/callback/callback.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { I18nBrowserModule } from './shared/i18n/i18n-browser.module';
import { I18nService } from './shared/i18n/i18n.service';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    CommonModule,
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    RootStoreModule,
    AppRoutingModule,
    I18nBrowserModule,
  ],
  providers: [
    I18nService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CallbackComponent,
  ],
})
export class AppModule {
}
