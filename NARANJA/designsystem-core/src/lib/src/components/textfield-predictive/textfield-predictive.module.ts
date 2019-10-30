import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZTextfieldPredictiveComponent } from './textfield-predictive.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZTextfieldModule } from '../textfield/textfield.module';
import { NGZSelectModule } from '../select/select.module';
import { NGZContainerIconModule } from '../container-icon/container-icon.module';
import { NGZModalModule } from '../modal/index';
import { NGZListModule } from '../list/index';

@NgModule({
  imports: [
    CommonModule,
    ZUtilsModule,
    NGZTextfieldModule,
    NGZModalModule.forRoot(),
    NGZSelectModule,
    NGZContainerIconModule,
    NGZListModule
  ],
  declarations: [
    NGZTextfieldPredictiveComponent
  ],
  exports: [
    NGZTextfieldPredictiveComponent
  ],
  providers: []
})
export class NGZTextfieldPredictiveModule {
  constructor() { }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZTextfieldPredictiveModule
    };
  }
}
