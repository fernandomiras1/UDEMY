import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { ProcedimientosMayoresModule } from './procedimientos-mayores/procedimientos-mayores.module';
import { AdministradorConfiguracionService, SpinnerModule } from 'tips.comun';
import { ConfigLoader } from './configuracion/configuracion';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SpinnerModule,
    RouterModule.forRoot([]),
    ProcedimientosMayoresModule
  ],
  providers: [
    AdministradorConfiguracionService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [AdministradorConfiguracionService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
