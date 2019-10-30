import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZFormModule } from './forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ZDirectiveModule } from './directives/directives.module';
import { ZServicesModule } from './services/services.module';

@NgModule({
  imports: [
    CommonModule,
    ZFormModule.forRoot(),
    ZDirectiveModule,
    ZServicesModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    ZDirectiveModule,
    ZServicesModule,
    ZFormModule
  ]
})
export class ZUtilsModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZUtilsModule
    };
  }
}
