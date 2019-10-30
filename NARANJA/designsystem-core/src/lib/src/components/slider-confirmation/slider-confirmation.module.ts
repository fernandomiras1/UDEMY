import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZSliderConfirmationComponent } from './slider-confirmation.component';
import { NGZLoadingModule } from '../loading/loading.module';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZSliderConfirmationComponent
  ],
  imports: [
    CommonModule,
    NGZLoadingModule,
    ZUtilsModule
  ],
  exports: [
    NGZSliderConfirmationComponent
  ]
})
export class NGZSliderConfirmationModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZSliderConfirmationModule
    };
  }
}
