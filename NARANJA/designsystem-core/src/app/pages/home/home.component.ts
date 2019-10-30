import { Component } from '@angular/core';
import { WindowService } from '../../../lib/src/utils/services/window/window.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dsn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  status = ['available', 'beta', 'deprecated'];
  link = 'https://angular.io/docs/ts/latest/guide/browser-support.html';

  constructor(
    private windowService: WindowService,
    private router: Router) { }

  navigateTo(): void {
    this.windowService.nativeWindow.open(this.link, '_blank');
  }

  redirectPublish() {
    this.router.navigate(['/publish']);
  }
}
