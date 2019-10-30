import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenSinkComponent } from './kitchen-sink.component';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from '../../components/components.module';
import { KitchenSinkRoutingModule } from './kitchen-sink.routing';

import { ZumoModule } from '../../../lib/src';

// Components
import { KsAccordionComponent } from './components/accordion/ks-accordion.component';
import { KsAvatarComponent } from './components/avatar/ks-avatar.component';
import { KsButtonsComponent } from './components/buttons/ks-buttons.component';
import { KsCardComponent } from './components/card/ks-card.component';
import { KsCheckboxComponent } from './components/checkbox/ks-checkbox.component';
import { KsChipsComponent } from './components/chips/ks-chips.component';
import { KsConfirmationSliderComponent } from './components/confirmation-slider/ks-confirmation-slider.component';
import { KsDialogsComponent } from './components/dialogs/ks-dialogs.component';
import { KsCustomDialogTestComponent } from './components/dialogs/custom-dialog/custom-dialog.component';
import { KsListsComponent } from './components/lists/ks-lists.component';
import { KsRadiobuttonComponent } from './components/radiobutton/ks-radiobutton.component';
import { KsSelectComponent } from './components/select/ks-select.component';
import { KsSliderControlComponent } from './components/slider-control/ks-slider-control.component';
import { KsSnackbarComponent } from './components/snackbar/ks-snackbar.component';
import { KsSpinnerComponent } from './components/spinner/ks-spinner.component';
import { KsSwitchComponent } from './components/switch/ks-switch.component';
import { KsTabsComponent } from './components/tabs/ks-tabs.component';
import { KsPredictiveTextfieldComponent } from './components/textfield-predictive/ks-textfield-predictive.component';
import { KsTextfieldComponent } from './components/textfield/ks-textfield.component';
import { KsIconsComponent } from './components/icons/ks-icons.component';
import { KsAlertMessageComponent } from './components/alert-message/ks-alert-message.component';

@NgModule({
  imports: [
    CommonModule,
    KitchenSinkRoutingModule,
    ComponentsModule,
    MarkdownModule.forChild(),
    ZumoModule
  ],
  declarations: [
    KitchenSinkComponent,
    KsAccordionComponent,
    KsAvatarComponent,
    KsButtonsComponent,
    KsCardComponent,
    KsCheckboxComponent,
    KsChipsComponent,
    KsConfirmationSliderComponent,
    KsDialogsComponent,
    KsCustomDialogTestComponent,
    KsListsComponent,
    KsRadiobuttonComponent,
    KsSelectComponent,
    KsSliderControlComponent,
    KsSnackbarComponent,
    KsSpinnerComponent,
    KsSwitchComponent,
    KsTabsComponent,
    KsPredictiveTextfieldComponent,
    KsTextfieldComponent,
    KsIconsComponent,
    KsAlertMessageComponent
  ],
  exports: [
    KitchenSinkComponent,
    KsAvatarComponent,
    KsButtonsComponent,
    KsCardComponent,
    KsCheckboxComponent,
    KsChipsComponent,
    KsConfirmationSliderComponent,
    KsDialogsComponent,
    KsCustomDialogTestComponent,
    KsListsComponent,
    KsRadiobuttonComponent,
    KsSelectComponent,
    KsSliderControlComponent,
    KsSnackbarComponent,
    KsSpinnerComponent,
    KsSwitchComponent,
    KsTabsComponent,
    KsPredictiveTextfieldComponent,
    KsTextfieldComponent,
    KsIconsComponent,
    KsAlertMessageComponent
  ],
  entryComponents: [
    KsCustomDialogTestComponent
  ]
})
export class KitchenSinkModule { }
