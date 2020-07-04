import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
// ngrx
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store';
import { AuthorizationGuard } from './guards/authorization.guard';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationUtilsService } from './services/authentication-utils.service';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { Router } from '@angular/router';
import { AppRbacAllowDirective } from './directives/rbac-allow.directive';
import { AuthenticationGuard } from './guards/authentication.guard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([fromAuth.AuthEffects]),
  ],
  declarations: [
    AppRbacAllowDirective,
  ],
  exports: [
    AppRbacAllowDirective,
  ],
  providers: [
    AuthenticationUtilsService,
    AuthenticationInterceptor,
    AuthenticationService,
    AuthenticationGuard,
    {
      provide: 'authTITOnlyGuard',
      useFactory: (authService: AuthenticationService, router: Router) => new AuthorizationGuard(['TIT'], authService, router),
      deps: [
        AuthenticationService,
        Router,
        AuthenticationUtilsService,
      ],
    },
  ],
})
export class AuthenticationModule {}
