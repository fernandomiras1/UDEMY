import { Component, OnInit } from '@angular/core';
import { AlertDetailComponent } from '@modals/alert-detail/alert-detail.component';
import { ModalController } from '@ionic/angular';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AlertsFilterModalComponent } from '@modals/alerts-filter-modal/alerts-filter-modal.component';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  public onlyView = false;

  data = [
    {
      "title": "Usuarios sin número",
      "text": "Se listan los usuarios que estan asignados a un telefno, si esto es una prueba",
      "date": "19/08",
      "hour": "22:15",
      "icon": "calendar",
      "isViewed": false
    },
    {
      "title": "Cambio de prioridades",
      "text": "Se listan los usuarios que estan asignados a un telefno, si esto es una prueba",
      "date": "19/08",
      "hour": "22:15",
      "icon": "swap-vertical",
      "isViewed": false
    },
    {
      "title": "Configuración de teléfono",
      "text": "Se requiere configurar su teléfono",
      "date": "19/08",
      "hour": "22:15",
      "icon": "globe",
      "isViewed": false
    },
    {
      "title": "Alarma encendida",
      "text": "Se informa que se acaba de encender la alarma",
      "date": "19/08",
      "hour": "22:15",
      "icon": "alarm",
      "isViewed": false
    },
    {
      "title": "Nueva plantilla",
      "text": "Se listan los usuarios que estan asignados a un telefno, si esto es una prueba",
      "date": "19/08",
      "hour": "22:15",
      "icon": "book",
      "isViewed": false
    },
    {
      "title": "Nueva alarma",
      "text": "Se creó la alarma asignada al usuario",
      "date": "19/08",
      "hour": "22:15",
      "icon": "alarm",
      "isViewed": true
    },
  ];
  form: FormGroup;
  filteredOptions: Observable<any[]>;
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: ['']
    });

    this.filteredOptions = this.form.get('search').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.data.slice())
    );
  }

  async open(alert) {
    alert.isViewed = true;
    const modal = await this.modalCtrl.create({
      component: AlertDetailComponent,
      componentProps: {
        nombre: 'fernando',
        pais: 'ARG'
      }
    });

    modal.present();
  }

  async showFilterModal(alert) {
    const modal = await this.modalCtrl.create({
      component: AlertsFilterModalComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    console.log('modal data:', data);
  }

  public onChangeToggleViewed(value: boolean) {
    const newData = this.data.filter(item => !item.isViewed)
    const filterData = value ? newData : this.data
    this.filteredOptions = of(filterData)
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.data.filter(option => option.title.toLowerCase().indexOf(filterValue) === 0);
  }

}
