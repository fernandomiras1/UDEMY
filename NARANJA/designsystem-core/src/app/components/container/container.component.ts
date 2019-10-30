import { Component, Input, ContentChild, OnInit } from '@angular/core';
import { WindowService } from '../../../lib/src/utils/services/window/window.service';

@Component({
  selector: 'dsn-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() info = {
    status: '',
    browserSupport: {}
  };
  @Input() status: string;
  @Input() title: string;
  @Input() description: string;
  @Input() link: string;
  @ContentChild('exampleContentTemplate') exampleTemplate;

  showMenu = false;

  constructor(private windowService: WindowService) { }

  ngOnInit() {
    this.showMenu = true;
  }

  navigateTo(): void {
    this.windowService.nativeWindow.open(this.link, '_blank');
  }

  /**
   * This method is called by each click in the main menu
   * @param isVisible boolean
   */
  handleMenu(isVisible) {
    this.showMenu = !isVisible;
  }
}
