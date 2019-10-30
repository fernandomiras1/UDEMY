import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZAccordionComponent } from './accordion.component';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZAccordionComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZAccordionComponent
  ]
})
export class NGZAccordionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZAccordionModule
    };
  }
}
