import { NgModule, ModuleWithProviders } from '@angular/core';
import { ModalComponent } from './modal.component';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { ModalService } from './service/modal.service';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    ModalComponent
  ],
  providers: [ModalService]
})
export class NGZModalModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZModalModule,
      providers: [
        ModalService
      ]
    };
  }
}
