import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZCardComponent } from './card.component';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZCardComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZCardComponent
  ]
})
export class NGZCardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZCardModule
    };
  }
}
