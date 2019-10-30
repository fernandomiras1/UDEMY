import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NGZDialogService } from './services/dialog.service';
import { NGZDialogComponent } from './dialog.component';
import { NGZContainerIconModule } from '../container-icon/container-icon.module';
import { NGZButtonModule } from '../button/button.module';
import { NGZCardModule } from '../card/card.module';

@NgModule({
  declarations: [
    NGZDialogComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule,
    NGZContainerIconModule,
    NGZButtonModule,
    NGZCardModule
  ],
  exports: [
    NGZDialogComponent
  ],
  entryComponents: [NGZDialogComponent],
  providers: [
    NGZDialogService,
    NGZModalDialogService,
    DeviceDetectorService
  ]
})
export class NGZDialogModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZDialogModule,
      providers: [
        NGZDialogService,
        NGZModalDialogService,
        DeviceDetectorService
      ]
    };
  }
}
