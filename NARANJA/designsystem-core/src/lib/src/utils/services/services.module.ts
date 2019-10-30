import { NgModule, ModuleWithProviders } from '@angular/core';
import { NGZModalDialogService } from './modal/modal-dialog.service';
import { NGZModalDialogInstanceService } from './modal/modal-dialog-instance.service';
import { DocumentService } from './document/document.service';
import { WindowService } from './window/window.service';
import { NavigatorService } from './navigator/navigator.service';
import { KeypressService } from './keypress/keypress.service';

@NgModule({
  providers: [NGZModalDialogService, NGZModalDialogInstanceService, DocumentService, WindowService, NavigatorService, KeypressService]
})
export class ZServicesModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZServicesModule
    };
  }
}
