import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZAvatarPillComponent } from './avatar-pill.component';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZAvatarPillComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZAvatarPillComponent
  ]
})
export class NGZAvatarPillModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZAvatarPillModule
    };
  }
}
