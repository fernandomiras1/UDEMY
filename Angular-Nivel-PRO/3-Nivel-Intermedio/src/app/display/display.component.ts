import { Component, Input, Output, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnChanges{

  @Input() time:number = null;
  public minutes: string = "00";
  public seconds: string = "00";

  constructor() { }

  ngOnChanges(changes) {
    if ( changes.time ) {
      // Math.trunc: se queda con la parte entera.
      const value = changes.time.currentValue;
      const minutes = Math.trunc( value / 60 );
      const seconds = value - minutes * 60;

      // creando dos digitos
      // me quedo con los dos ultimos elemento del string
      this.minutes = ("0" + minutes ).substr(-2);
      this.seconds = ("0" + seconds ).substr(-2);
    }
  }

}
