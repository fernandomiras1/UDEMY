import { NgModule } from '@angular/core';
import { ModalModule } from 'angular-custom-modal';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ModalDeleteRepetitionsComponent } from './modal-delete-repetitions/modal-delete-repetitions.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { AppRoutingModule } from './../app-routing.module';
import { SelectComponent } from './select/select.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalValidarTelefonoComponent } from './modal-validar-telefono/modal-validar-telefono.component';
import { ModalShowTurnComponent } from './modal-show-turn/modal-show-turn.component';
import { ModalLeaveGroupComponent } from './modal-leave-group/modal-leave-group.component';
import { ModalDisabledTurnComponent } from './modal-disabled-turn/modal-disabled-turn.component';
import { ModalDeleteTurnComponent } from './modal-delete-turn/modal-delete-turn.component';
import { ModalDeleteGroupComponent } from './modal-delete-group/modal-delete-group.component';
import { ModalCollisionTurnComponent } from './modal-collision-turn/modal-collision-turn.component';
import { ModalCollisionGroupComponent } from './modal-collision-group/modal-collision-group.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { CardComponent } from './card/card.component';
import { ModalTurnoComponent } from './modal-turno/modal-turno.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ModalProfileValidationsComponent } from './modal-profile-validations/modal-profile-validations.component';
import { SigosValidationComponent } from './sigos-validation/sigos-validation.component';
import { ModalComponent } from './modal/modal.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { PeopleByGroupComponent } from './people-by-group/people-by-group.component';
import { ModalEditPeopleByGroupComponent } from './modal-edit-people-by-group/modal-edit-people-by-group.component';
import { TemplatesComponent } from './templates/templates.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { ButtonComponent } from './button/button.component';
import { CardTemplateComponent } from './card-template/card-template.component';
import { ModalDeleteTemplateComponent } from './modal-delete-template/modal-delete-template.component';
import { ModalPeopleByGroupComponent } from './modal-people-by-group/modal-people-by-group.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    TooltipModule,
    PipesModule,
    NgxMatSelectSearchModule,
    NgxMaskModule.forRoot(options),
    Ng2SearchPipeModule,
    NgxUsefulSwiperModule,
    ModalModule
  ],
  declarations: [
    CardComponent,
    FormSelectComponent,
    ModalTurnoComponent,
    ModalCollisionGroupComponent,
    ModalCollisionTurnComponent,
    ModalDeleteGroupComponent,
    ModalDeleteTurnComponent,
    ModalDisabledTurnComponent,
    ModalLeaveGroupComponent,
    ModalShowTurnComponent,
    ModalValidarTelefonoComponent,
    ModalDeleteRepetitionsComponent,
    NavbarComponent,
    SelectComponent,
    ModalProfileValidationsComponent,
    SigosValidationComponent,
    ModalComponent,
    ChatbotComponent,
    NewGroupComponent,
    PeopleByGroupComponent,
    ModalEditPeopleByGroupComponent,
    TemplatesComponent,
    LoadingModalComponent,
    ButtonComponent,
    CardTemplateComponent,
    ModalDeleteTemplateComponent,
    ModalPeopleByGroupComponent,
  ],
  exports: [
    CardComponent,
    FormSelectComponent,
    ModalTurnoComponent,
    ModalCollisionGroupComponent,
    ModalCollisionTurnComponent,
    ModalDeleteTurnComponent,
    ModalDisabledTurnComponent,
    ModalLeaveGroupComponent,
    ModalShowTurnComponent,
    ModalValidarTelefonoComponent,
    ModalDeleteRepetitionsComponent,
    NavbarComponent,
    SelectComponent,
    SigosValidationComponent,
    ChatbotComponent,
    NewGroupComponent,
    PeopleByGroupComponent,
    ModalEditPeopleByGroupComponent,
    TemplatesComponent,
    LoadingModalComponent,
    ButtonComponent,
  ]
})
export class ComponentsModule { }
