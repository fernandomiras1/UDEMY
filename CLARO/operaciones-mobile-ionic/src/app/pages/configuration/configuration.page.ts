import { Component, OnInit } from '@angular/core';
import { SELECT_OPTION_CONFIG_TEL } from '@app/utils/static.data';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  notificationPush = false;
  selectOptionsTel = SELECT_OPTION_CONFIG_TEL;
  constructor() { }

  ngOnInit() {
  }

}
