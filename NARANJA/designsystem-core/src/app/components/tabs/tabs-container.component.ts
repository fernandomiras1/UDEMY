
import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'dsn-tabs',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  selectedTab: TabComponent;

  isSelected(tab: TabComponent): boolean {
    if (!this.selectedTab) {
      // if no selectedTab yet, select it
      this.selectedTab = tab;
    }

    return (this.selectedTab.title === tab.title);
  }

  onTabHeaderSelected(tab: TabComponent) {
    if (!this.isSelected(tab)) {
      this.selectedTab = tab;
    }
  }
}
