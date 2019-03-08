import { Component, OnInit } from '@angular/core';
import { ModeEnum } from '../../../../environments/environment';
import { ApplicationService } from '../../../services/application/application.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(public applicationService: ApplicationService) { }
  public modeEnum = ModeEnum;
  ngOnInit() {
 this.applicationService.currentStatus = ModeEnum.Search;
}
}
