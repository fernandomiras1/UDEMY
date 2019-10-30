import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZLoadingComponent } from './loading.component';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZLoadingComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZLoadingComponent,
    ZUtilsModule
  ]
})
export class NGZLoadingModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZLoadingModule
    };
  }
}
