import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NGZSnackbarModule } from './components/snackbar/snackbar.module';
import { NGZDialogModule } from './components/dialog/dialog.module';
import { NGZCustomDialogModule } from './components/custom-dialog/custom-dialog.module';
import { NGZButtonModule } from './components/button/button.module';
import { NGZChipsModule } from './components/chips/chips.module';
import { NGZAvatarModule } from './components/avatar/avatar.module';
import { NGZAvatarPillModule } from './components/avatar-pill/avatar-pill.module';
import { NGZContainerIconModule } from './components/container-icon/container-icon.module';
import { NGZCardModule } from './components/card/card.module';
import { NGZSliderConfirmationModule } from './components/slider-confirmation/slider-confirmation.module';
import { NGZRadioButtonModule } from './components/radiobuttons/radiobuttons.module';
import { NGZTextfieldModule } from './components/textfield/textfield.module';
import { NGZLoadingModule } from './components/loading/loading.module';
import { NGZListModule } from './components/list/list.module';
import { NGZSwitchModule } from './components/switch/switch.module';
import { NGZTabsModule } from './components/tabs/tabs.module';
import { NGZCheckboxsModule } from './components/checkboxs/checkboxs.module';
import { NGZSelectModule } from './components/select/select.module';
import { NGZMessageModule } from './components/message/message.module';
import { ZUtilsModule } from './utils/utils.module';
import { NGZAccordionModule } from './components/accordion/accordion.module';
import { NGZSliderControlModule } from './components/slider-control/slider-control.module';
import { NGZTextfieldPredictiveModule } from './components/textfield-predictive/textfield-predictive.module';
import { NGZModalModule } from './components/modal/index';

@NgModule({
  imports: [
    CommonModule,
    NGZAccordionModule.forRoot(),
    NGZAvatarModule.forRoot(),
    NGZAvatarPillModule.forRoot(),
    NGZButtonModule.forRoot(),
    NGZCardModule.forRoot(),
    NGZCheckboxsModule.forRoot(),
    NGZContainerIconModule.forRoot(),
    NGZChipsModule.forRoot(),
    NGZCustomDialogModule.forRoot(),
    NGZDialogModule.forRoot(),
    NGZListModule.forRoot(),
    NGZLoadingModule.forRoot(),
    NGZMessageModule.forRoot(),
    NGZRadioButtonModule.forRoot(),
    NGZSelectModule.forRoot(),
    NGZSliderConfirmationModule.forRoot(),
    NGZSnackbarModule.forRoot(),
    NGZSwitchModule.forRoot(),
    NGZTabsModule.forRoot(),
    NGZTextfieldModule.forRoot(),
    ZUtilsModule.forRoot(),
    NGZSliderControlModule.forRoot(),
    NGZTextfieldPredictiveModule.forRoot(),
    NGZModalModule.forRoot()
  ],
  exports: [
    NGZAccordionModule,
    NGZAvatarModule,
    NGZAvatarPillModule,
    NGZButtonModule,
    NGZCardModule,
    NGZCheckboxsModule,
    NGZContainerIconModule,
    NGZChipsModule,
    NGZCustomDialogModule,
    NGZDialogModule,
    NGZListModule,
    NGZLoadingModule,
    NGZMessageModule,
    NGZRadioButtonModule,
    NGZSliderConfirmationModule,
    NGZSelectModule,
    NGZSnackbarModule,
    NGZSwitchModule,
    NGZTabsModule,
    NGZTextfieldModule,
    ZUtilsModule,
    NGZSliderControlModule,
    NGZTextfieldPredictiveModule,
    NGZModalModule
  ],
  providers: [DeviceDetectorService]
})
export class ZumoModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZumoModule
    };
  }
}
