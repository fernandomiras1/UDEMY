import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZTextfieldComponent } from './textfield.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZCheckboxsModule } from '../checkboxs/checkboxs.module';

@NgModule({
  imports: [
    CommonModule,
    ZUtilsModule,
    NGZCheckboxsModule
  ],
  declarations: [
    NGZTextfieldComponent
  ],
  exports: [
    NGZTextfieldComponent
  ]
})
export class NGZTextfieldModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZTextfieldModule
    };
  }
}
