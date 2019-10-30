import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZUtilsModule } from '../../utils/utils.module';
import { NGZSnackbarComponent } from './snackbar.component';
import { NGZSnackbarService } from './services/snackbar.service';
import { NGZModalDialogService } from '../../utils/services/modal/modal-dialog.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@NgModule({
  declarations: [
    NGZSnackbarComponent
  ],
  imports: [
    CommonModule,
    ZUtilsModule
  ],
  exports: [
    NGZSnackbarComponent
  ],
  entryComponents: [NGZSnackbarComponent],
  providers: [
    NGZSnackbarService,
    NGZModalDialogService,
    DeviceDetectorService
  ]
})
export class NGZSnackbarModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NGZSnackbarModule,
      providers: [
        NGZSnackbarService,
        NGZModalDialogService,
        DeviceDetectorService
      ]
    };
  }
}
