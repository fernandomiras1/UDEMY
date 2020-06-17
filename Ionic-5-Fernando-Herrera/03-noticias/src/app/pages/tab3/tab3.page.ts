import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(public dataLocalService: DataLocalService) {}

  ngOnInit() {

  }

}
