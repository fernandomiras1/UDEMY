import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZCheckboxComponent } from './checkbox/checkbox.component';
import { NGZContainerCheckboxsComponent } from './checkboxs.component';

@NgModule({
  declarations: [
    NGZContainerCheckboxsComponent,
    NGZCheckboxComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZContainerCheckboxsComponent,
    NGZCheckboxComponent
  ]
})
export class NGZCheckboxsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZCheckboxsModule
    };
  }
}
