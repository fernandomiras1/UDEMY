import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './http/http.service';
import { CoreUtilModule } from './utils/utils.module';
import { AuthenticationModule } from './authentication/authentication.module';

// interceptors
import { ErrorInterceptor } from './http/error.interceptor';
import { TimingInterceptor } from './http/timing.interceptor';
import { LoggerService } from './utils/services/logger.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    CoreUtilModule,
    AuthenticationModule,
  ],
  providers: [
    {
      provide: HttpClient,
      useClass: HttpService,
    },
    ErrorInterceptor,
    TimingInterceptor,
    LoggerService,
  ],
  exports: [
    AuthenticationModule,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
