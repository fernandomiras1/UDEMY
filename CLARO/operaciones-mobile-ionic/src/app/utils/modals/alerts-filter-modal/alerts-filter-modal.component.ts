import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alerts-filter-modal',
  templateUrl: './alerts-filter-modal.component.html',
  styleUrls: ['./alerts-filter-modal.component.scss'],
})
export class AlertsFilterModalComponent implements OnInit {

  origenToggle = false;
  dateTo: Date = new Date();
  dateFrom: Date = new Date();

  origenList = [
    {name: 'Guardia', model: false},
    {name: 'AVI', model: false},
    {name: 'SES', model: false},
    {name: 'PUMA', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
    {name: 'Alarmas', model: false},
  ]
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  changeDateTo(event: CustomEvent) {
    this.dateTo = new Date(event.detail.value)
  }
  
  changeDateFrom(event: CustomEvent) {
    this.dateFrom = new Date(event.detail.value)
  }

  onSearch() {
    this.modalCtrl.dismiss({
      origenList: this.origenList,
      dateTo: this.dateTo,
      dateFrom: this.dateFrom,
    });
  }

}
