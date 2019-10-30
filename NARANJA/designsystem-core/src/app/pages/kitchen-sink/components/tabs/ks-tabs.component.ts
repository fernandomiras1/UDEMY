import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsn-kstabs',
  templateUrl: './ks-tabs.component.html',
  styleUrls: ['./ks-tabs.component.scss']
})
export class KsTabsComponent implements OnInit {
  public styleArray: any;

  ngOnInit(): void {
    this.styleArray = { height: '220px' };
  }

}
