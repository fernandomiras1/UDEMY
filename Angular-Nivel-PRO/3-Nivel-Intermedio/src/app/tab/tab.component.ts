import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tab } from "./tab.interface";
import { TabsComponent } from 'app/tabs/tabs.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() title:string;
  public isActive:boolean = false;
  // private tabsComponent: TabsComponent
  constructor() { }

  ngOnInit() {
    // Le paso la referencia al tab actual.
    // this.tabsComponent.addTab(this);
  }

  clickTabContent() {
    this.onClick.emit();
  }

}
