import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularPageComponent, UnknownDynamicComponent } from './angular.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from '../../components/components.module';
import { AngularRoutingModule } from './angular.routing';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MarkdownModule.forChild(),
    ComponentsModule,
    AngularRoutingModule
  ],
  declarations: [
    AngularPageComponent,
    UnknownDynamicComponent
  ],
  exports: [
    AngularPageComponent,
    UnknownDynamicComponent
  ],
  entryComponents: [
    AngularPageComponent,
    UnknownDynamicComponent
  ]
})
export class AngularPageModule { }
