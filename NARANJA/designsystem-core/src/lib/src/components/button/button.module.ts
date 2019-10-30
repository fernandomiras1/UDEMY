import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZButtonComponent } from './button.component';
import { NGZLoadingModule } from '../loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    NGZLoadingModule
  ],
  declarations: [
    NGZButtonComponent
  ],
  exports: [
    NGZButtonComponent
  ]
})
export class NGZButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZButtonModule
    };
  }
}
