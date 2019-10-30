import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZMessageComponent } from './message.component';

@NgModule({
  declarations: [
    NGZMessageComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZMessageComponent
  ]
})
export class NGZMessageModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZMessageModule
    };
  }
}
