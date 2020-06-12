import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  fechaNaci: Date = new Date();

  constructor() {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: (evento) => console.log('Clicked Save!', evento)
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  }
  
  ngOnInit() {
  }

  cambioFecha(event) {
    console.log('ionChange', event);
    console.log('Date', new Date(event.detail.value));
  }

}
