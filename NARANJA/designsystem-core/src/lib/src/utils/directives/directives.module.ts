import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZIterateKeys } from '../pipes/iterate-keys.pipes';
import { ZRippleEffectDirective } from './ripple-effect/ripple-effect.directive';
import { ZHoverDirective } from './hover/hover.directive';
import { ZOuterClickDirective } from './outerclick/outerclick.directive';
import { ZErrorFeedbackDirective } from './error-feedback/error-feedback.directive';
import { ZBrowserDirective } from './browser/browser.directive';
import { ZDatePipe } from '../pipes/date.pipes';

export const commonPipes = [
  ZIterateKeys,
  ZDatePipe,
  ZRippleEffectDirective,
  ZHoverDirective,
  ZOuterClickDirective,
  ZBrowserDirective,
  ZErrorFeedbackDirective
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: commonPipes,
  exports: commonPipes
})
export class ZDirectiveModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ZDirectiveModule
    };
  }
}
