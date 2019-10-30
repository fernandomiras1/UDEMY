import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZContainerIconComponent } from './container-icon.component';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZContainerIconComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZContainerIconComponent,
    ZUtilsModule
  ]
})
export class NGZContainerIconModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZContainerIconModule
    };
  }
}
