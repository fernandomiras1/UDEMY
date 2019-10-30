import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-ksicons',
  templateUrl: './ks-icons.component.html',
  styleUrls: ['./ks-icons.component.scss']
})
export class KsIconsComponent implements OnInit {
  public icons;

  constructor() { }

  ngOnInit() {
    this.icons = [
      { name: 'icon-add' },
      { name: 'icon-angle-left' },
      { name: 'icon-angle-right' },
      { name: 'icon-apps' },
      { name: 'icon-arrow-left' },
      { name: 'icon-arrow-right' },
      { name: 'icon-bank' },
      { name: 'icon-branch' },
      { name: 'icon-bus' },
      { name: 'icon-cash-in' },
      { name: 'icon-cash-out-atm' },
      { name: 'icon-check' },
      { name: 'icon-check-circle' },
      { name: 'icon-clock' },
      { name: 'icon-cross' },
      { name: 'icon-cross-circle' },
      { name: 'icon-log-out' },
      { name: 'icon-bike' },
      { name: 'icon-motorbike' },
      { name: 'icon-card' },
      { name: 'icon-cog' },
      { name: 'icon-dashboard' },
      { name: 'icon-dog' },
      { name: 'icon-filter' },
      { name: 'icon-help' },
      { name: 'icon-house' },
      { name: 'icon-magnifier' },
      { name: 'icon-summary' },
      { name: 'icon-system' },
      { name: 'icon-menu' },
      { name: 'icon-message' },
      { name: 'icon-qr-code' },
      { name: 'icon-qr-code-scan' },
      { name: 'icon-send' },
      { name: 'icon-ticket' },
      { name: 'icon-trash' },
      { name: 'icon-user' },
      { name: 'icon-arrow-up' },
      { name: 'icon-arrow-down' },
      { name: 'icon-angle-up' },
      { name: 'icon-angle-down' },
      { name: 'icon-face-smile' },
      { name: 'icon-alert-circle' },
      { name: 'icon-tv' },
      { name: 'icon-share' },
      { name: 'icon-save' },
      { name: 'icon-overflow' },
      { name: 'icon-magazine' },
      { name: 'icon-insurance' },
      { name: 'icon-info-circle' },
      { name: 'icon-cash' },
      { name: 'icon-cards' },
      { name: 'icon-car' },
      { name: 'icon-alert' },
      { name: 'icon-show-pass' },
      { name: 'icon-hide-pass' }
    ];
  }

}
