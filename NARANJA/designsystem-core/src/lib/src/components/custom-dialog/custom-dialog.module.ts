import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NGZCustomDialogComponent } from './custom-dialog.component';
import { NGZCustomDialogService } from './services/custom-dialog.service';
import { NGZCardModule } from '../card/card.module';

@NgModule({
  declarations: [
    NGZCustomDialogComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule,
    NGZCardModule
  ],
  exports: [
    NGZCustomDialogComponent
  ],
  entryComponents: [NGZCustomDialogComponent],
  providers: [
    NGZCustomDialogService,
    NGZModalDialogService,
    DeviceDetectorService
  ]
})
export class NGZCustomDialogModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZCustomDialogModule,
      providers: [
        NGZCustomDialogService,
        NGZModalDialogService,
        DeviceDetectorService
      ]
    };
  }
}
