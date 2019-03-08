import { Component, OnInit, Input } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './graficoDona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  constructor() { }

   // Doughnut
   @Input() chartLabels: string[] = [];
   @Input() chartData: number[] =  [];
   @Input() chartType: string = '';

  ngOnInit() {
  }

}
