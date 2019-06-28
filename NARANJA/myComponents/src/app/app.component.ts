import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myComponents';
  min = 0;
  max = 2000;
  step = 1;
  disabled = false;
  titleActive = '¿Tus ingresos aproximados?';
  prefix = '$';


  public valuesChange(value: number) {
    console.log('value', value);
  }


}
