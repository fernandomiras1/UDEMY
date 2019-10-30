import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ContainerComponent } from './container/container.component';
import { LoadListComponent } from './load-list/load-list.component';
import { TabComponent } from './tabs/tab.component';
import { TabsContainerComponent } from './tabs/tabs-container.component';
import { ZumoModule } from '../../lib/src';
import { StatusComponent } from './component-status/component-status.component';
import { BrowserSupportComponent } from './browser-support/browser-support.component';
import { TableComponent } from './table/table.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MarkdownModule.forChild(),
    ZumoModule
  ],
  declarations: [
    ContainerComponent,
    LoadListComponent,
    TabComponent,
    TabsContainerComponent,
    StatusComponent,
    BrowserSupportComponent,
    TableComponent,
    NavbarComponent
  ],
  exports: [
    ContainerComponent,
    LoadListComponent,
    TabComponent,
    TabsContainerComponent,
    StatusComponent,
    TableComponent,
    NavbarComponent
  ],
  entryComponents: [
    ContainerComponent,
    LoadListComponent,
    TabComponent,
    TabsContainerComponent,
    StatusComponent,
    TableComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
