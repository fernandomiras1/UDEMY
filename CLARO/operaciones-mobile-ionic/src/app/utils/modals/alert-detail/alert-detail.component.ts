import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.scss'],
})
export class AlertDetailComponent implements OnInit {

  // el nombre del Input tiene que ser igual a los props del Modal Padre.
  @Input() nombre;
  @Input() pais;
  description = 'Mobile devices and browsers are now advanced enough that developers can build native-quality mobile apps using open web technologies like HTML5, Javascript, and CSS. In this talk, we’ll provide background on why and how we created Ionic, the design decisions made as we integrated Ionic with Angular, and the performance considerations for mobile platforms that our team had to overcome. We’ll also review new and upcoming Ionic features, and talk about the hidden powers and benefits of combining mobile app development and Angular.'
  
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  salirConArgumentosModal() {
    this.modalCtrl.dismiss({
      nombre: 'Felipe',
      pais: 'España'
    });
  }

}
