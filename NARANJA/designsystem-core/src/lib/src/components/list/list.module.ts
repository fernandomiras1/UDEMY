import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZListComponent } from './list.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZAvatarModule } from '../avatar/avatar.module';
import { NGZRadioButtonModule } from '../radiobuttons/radiobuttons.module';
import { NGZContainerIconModule } from '../container-icon/container-icon.module';

@NgModule({
  imports: [
    CommonModule,
    NGZAvatarModule,
    NGZRadioButtonModule,
    ZUtilsModule,
    NGZContainerIconModule
  ],
  declarations: [
    NGZListComponent,
    NGZListComponent
  ],
  exports: [
    NGZListComponent,
    NGZListComponent
  ]
})
export class NGZListModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZListModule
    };
  }
}
