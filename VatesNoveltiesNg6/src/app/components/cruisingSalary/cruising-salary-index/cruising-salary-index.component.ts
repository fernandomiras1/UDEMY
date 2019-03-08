import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../services/application/application.service';
import { ModeEnum } from '../../../../environments/environment';

@Component({
  selector: 'app-cruising-salary-index',
  templateUrl: './cruising-salary-index.component.html',
  styleUrls: ['./cruising-salary-index.component.css']
})
export class CruisingSalaryIndexComponent implements OnInit {

  constructor(public applicationService: ApplicationService) { }
  public modeEnum = ModeEnum;
  ngOnInit() {
  this.applicationService.currentStatus = ModeEnum.Search;
  }

}
