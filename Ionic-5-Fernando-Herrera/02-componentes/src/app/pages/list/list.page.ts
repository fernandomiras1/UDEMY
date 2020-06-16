import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @ViewChild('lista', {static: false}) lista: IonList;
  usuarios: Observable<any>;
  constructor(private dataService: DataService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.usuarios = this.dataService.getUsers();
  }

  async presentToast(message:string, color:string, position:"top" | "bottom" | "middle") {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position
    });
    toast.present();
  }


  favorite(user) {
    this.presentToast('Guardo en favoritos', 'tertiary', 'bottom');
    // para cerrar el sliding
    this.lista.closeSlidingItems();
  }

  share(user) {
    console.log(user);
    // para cerrar el sliding
    this.lista.closeSlidingItems();
    this.presentToast('Compartido', 'success', 'middle');
  }

  unread(user) {
    console.log(user);
    // para cerrar el sliding
    this.lista.closeSlidingItems();
    this.presentToast('Borrado !', 'danger', 'top');
  }

}
