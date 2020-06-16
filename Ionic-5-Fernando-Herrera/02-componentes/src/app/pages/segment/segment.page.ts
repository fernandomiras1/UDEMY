import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  publisher = '';
  // @ViewChild('segment') segment: IonSegment;
  superHeroes: Observable<any>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.segment.value = 'todos';
    this.superHeroes = this.dataService.getSuperheroes();
  }

  segmentChanged(ev: any) {
    const valorSegmento = ev.detail.value;
    if (valorSegmento === 'todos') {
      this.publisher = ''
    } else {
      this.publisher = valorSegmento;
    }
    console.log(valorSegmento);
  }

}
