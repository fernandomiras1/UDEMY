import { Component, AfterContentInit, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { ITab } from './tab/tab.interface';
import { NGZTabComponent } from './tab/tab.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'z-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class NGZTabsComponent implements AfterContentInit {

  @ContentChildren(NGZTabComponent) tabs: QueryList<NGZTabComponent>;
  @ViewChild('tabContent') tabContent;

  constructor(private deviceDetector: DeviceDetectorService) {
  }

  ngAfterContentInit() {
    this.tabs.reset(this.tabs.filter(x => !x.isHidden));
    this.selectTab(this.tabs.find(x => x.isActive) ? this.tabs.find(x => x.isActive) : this.tabs.first, 0);
  }

  selectTab(tab: ITab, indexSelect: number) {
    if (!tab.disabled) {
      this.tabs.forEach(aux => aux.isActive = false);
      tab.isActive = true;
    }
    if (this.deviceDetector.getDeviceInfo().browser !== 'IE') {
      this.scrollTabs(indexSelect);
    }
  }

  scrollTabs(indexSelect: number) {
    const children = this.tabContent.nativeElement.children[indexSelect];
    if (indexSelect > 0 && children && children.offsetLeft) {
      this.tabContent.nativeElement.scrollTo(children.offsetLeft * 0.75, children.scrollWidth);
    } else {
      this.tabContent.nativeElement.scrollTo(0, 0);
    }
  }
}
