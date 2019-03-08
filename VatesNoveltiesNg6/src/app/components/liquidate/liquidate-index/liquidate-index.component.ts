import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application/application.service';
import { ModeEnum } from 'src/environments/environment';

@Component({
  selector: 'app-liquidate-index',
  templateUrl: './liquidate-index.component.html',
  styleUrls: ['./liquidate-index.component.css']
})
export class LiquidateIndexComponent implements OnInit {

  constructor(public applicationService: ApplicationService) { }
  public modeEnum = ModeEnum;
  ngOnInit() {
    this.applicationService.currentStatus = ModeEnum.Search;
  }

}
