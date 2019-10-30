import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'dsn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() clickMenu = new EventEmitter();
  public showMenu: boolean;
  public isMobile = false;

  constructor(
    private router: Router,
    private deviceDetector: DeviceDetectorService) {
    this.isMobile = this.deviceDetector.isMobile();
    this.showMenu = false;
  }

  onClickMenu() {
    this.showMenu = !this.showMenu;
    this.clickMenu.emit(this.showMenu);
  }

  navigateTo() {
    this.router.navigate(['/home']);
  }
}
