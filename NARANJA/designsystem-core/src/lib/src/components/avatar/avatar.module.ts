import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZAvatarComponent } from './avatar.component';
import { ZUtilsModule } from '../../utils/utils.module';

@NgModule({
  declarations: [
    NGZAvatarComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZAvatarComponent
  ]
})
export class NGZAvatarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZAvatarModule
    };
  }
}
