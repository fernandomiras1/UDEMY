import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
// library
import { ZumoModule } from '../../lib/src';
// demo
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChipsComponent } from './chips/chips.component';
import { ButtonComponent } from './button/button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { RouterModule } from '@angular/router';
import { IconComponent } from './icon/icon.component';
import { SliderConfirmationComponent } from './slider-confirmation/slider-confirmation.component';
import { TabsComponent } from './tabs/tabs.component';
import { CardComponent } from './card/card.component';
import { SwitchComponent } from './switch/switch.component';
import { AvatarComponent } from './avatar/avatar.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ListComponent } from './list/list.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SelectComponent } from './select/select.component';
import { DemoFormComponent } from './demo-form/demo-form.component';
import { TypographyComponent } from './typography/typography.component';
import { ClickOutsideComponent } from './click-outside/click-outside.component';
import { BrowserComponent } from './browser/browser.component';
import { HoverComponent } from './hover/hover.component';
import { RippleComponent } from './ripple/ripple.component';
import { FeedbackPagesComponent } from './feedback-pages/feedback-pages.component';
import { SliderControlComponent } from './slider-control/slider-control.component';
import { LayoutComponent } from './layout/layout.component';
import { DialogComponent } from './dialog/dialog.component';
import { PoliticaComponent } from './dialog/politica/politica.component';
import { AccordionComponent } from './accordion/accordion.component';
import { TextfieldPredictiveComponent } from './textfield-predictive/textfield-predictive.component';
import { MessageComponent } from './message/message.component';
import { OthersComponent } from './others/others.component';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forChild(),
    ZumoModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    ButtonComponent,
    ChipsComponent,
    SpinnerComponent,
    TextfieldComponent,
    IconComponent,
    CardComponent,
    RadiobuttonComponent,
    SliderConfirmationComponent,
    CheckboxComponent,
    SwitchComponent,
    ListComponent,
    TabsComponent,
    CardComponent,
    AvatarComponent,
    SnackbarComponent,
    SelectComponent,
    DemoFormComponent,
    TypographyComponent,
    ClickOutsideComponent,
    BrowserComponent,
    HoverComponent,
    RippleComponent,
    FeedbackPagesComponent,
    SliderControlComponent,
    DialogComponent,
    LayoutComponent,
    PoliticaComponent,
    AccordionComponent,
    TextfieldPredictiveComponent,
    OthersComponent,
    MessageComponent,
    ColorsComponent
  ],
  exports: [
    ButtonComponent,
    ChipsComponent,
    SpinnerComponent,
    TextfieldComponent,
    IconComponent,
    SliderConfirmationComponent,
    TabsComponent,
    ListComponent,
    AvatarComponent,
    CardComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    SwitchComponent,
    SnackbarComponent,
    TypographyComponent,
    SelectComponent,
    DemoFormComponent,
    ClickOutsideComponent,
    BrowserComponent,
    HoverComponent,
    RippleComponent,
    FeedbackPagesComponent,
    SliderControlComponent,
    DialogComponent,
    LayoutComponent,
    PoliticaComponent,
    AccordionComponent,
    TextfieldPredictiveComponent,
    OthersComponent,
    MessageComponent,
    ColorsComponent
  ],
  entryComponents: [
    ButtonComponent,
    ChipsComponent,
    SpinnerComponent,
    ListComponent,
    TextfieldComponent,
    IconComponent,
    CardComponent,
    RadiobuttonComponent,
    SliderConfirmationComponent,
    TabsComponent,
    AvatarComponent,
    SwitchComponent,
    CheckboxComponent,
    SnackbarComponent,
    TypographyComponent,
    SelectComponent,
    DemoFormComponent,
    ClickOutsideComponent,
    BrowserComponent,
    HoverComponent,
    RippleComponent,
    FeedbackPagesComponent,
    SliderControlComponent,
    LayoutComponent,
    DialogComponent,
    PoliticaComponent,
    AccordionComponent,
    TextfieldPredictiveComponent,
    OthersComponent,
    MessageComponent,
    ColorsComponent
  ]
})
export class ShowcaseModule {

}
