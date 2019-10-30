import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZContainerRadiobuttonsComponent } from './radiobuttons.component';
import { NGZRadiobuttonComponent } from './radiobutton/radiobutton.component';

@NgModule({
  declarations: [
    NGZContainerRadiobuttonsComponent,
    NGZRadiobuttonComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZContainerRadiobuttonsComponent,
    NGZRadiobuttonComponent
  ]
})
export class NGZRadioButtonModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZRadioButtonModule
    };
  }
}
