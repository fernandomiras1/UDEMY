import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated(transitionInfo) {
          console.log(
            '%c transitionInfo:',
            'background: #222; color: #bada55',
            transitionInfo
          );
        },
      })
    ),
    // Aqui vamos a poder agregar todos los modulos que necesitemos agregar
    importProvidersFrom(HttpClientModule),
  ],
};
