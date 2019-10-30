import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZSwitchComponent } from './switch.component';

@NgModule({
  declarations: [
    NGZSwitchComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZSwitchComponent
  ]
})
export class NGZSwitchModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZSwitchModule
    };
  }
}
