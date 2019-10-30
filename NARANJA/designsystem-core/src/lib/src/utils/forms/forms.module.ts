import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessageComponent } from './control-message/control-message.component';
import { ControlMessagesComponent } from './control-message/control-messages.component';
import { FormsModule } from '@angular/forms';
import { ZDirectiveModule } from '../directives/directives.module';
import { ErrorMessages, CustomValidators } from './custom-validators/custom-validators';

export const FORMS_ERROR_MESSAGES = new InjectionToken<ErrorMessages>('ErrorMessages');
export const FORMS_CUSTOM_VALIDATORS = new InjectionToken<CustomValidators>('CustomValidators');

export function formErrorMessages() {
  return ErrorMessages;
}

export function formCustomValidators() {
  return CustomValidators;
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ZDirectiveModule

  ],
  declarations: [
    ControlMessageComponent,
    ControlMessagesComponent
  ],
  exports: [
    ControlMessageComponent,
    ControlMessagesComponent
  ],
  providers: [
    { provide: FORMS_ERROR_MESSAGES, useFactory: formErrorMessages },
    { provide: FORMS_CUSTOM_VALIDATORS, useFactory: formCustomValidators }
  ],
  entryComponents: [
  ]
})
export class ZFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZFormModule,
      providers: [
        { provide: FORMS_ERROR_MESSAGES, useFactory: formErrorMessages },
        { provide: FORMS_CUSTOM_VALIDATORS, useFactory: formCustomValidators }
      ]
    };
  }
}
