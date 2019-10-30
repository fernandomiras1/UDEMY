import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NGZTabsComponent } from './tabs.component';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZTabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    NGZTabsComponent,
    NGZTabComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZTabsComponent,
    NGZTabComponent
  ]
})
export class NGZTabsModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZTabsModule
    };
  }
}
