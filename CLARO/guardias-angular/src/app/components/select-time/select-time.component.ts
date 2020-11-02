import { Component, OnInit } from '@angular/core';
import { DataObsService } from '../../services/data-obs.service';
import { SessionManagerService } from '@app/services/session-manager.service';
import { MODE_SELECT_TIME } from '@app/utils/common.enum';
@Component({
  selector: 'app-select-time',
  templateUrl: './select-time.component.html',
  styleUrls: ['./select-time.component.scss']
})
export class SelectTimeComponent implements OnInit {
  public selectTime: string;
  private selecTimeSession: string;
  public selecType: typeof MODE_SELECT_TIME = MODE_SELECT_TIME;

  constructor(private dataobsservice: DataObsService) { }

  ngOnInit(): void {
    this.selecTimeSession = SessionManagerService.getItem('selecTime');
    if (this.selecTimeSession) {
      this.selectTime = this.selecTimeSession;
    } else {
      this.selectTime = this.selecType.DAYS;
    }
  }

  changedValue(value: string ) {
    SessionManagerService.setItem('selecTime', value);
    this.dataobsservice.selectTimeCalendar.emit(value);
  }

}
