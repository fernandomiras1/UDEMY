import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverInfoComponent } from '../../components/popover-info/popover-info.component';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  async mostrarPop(evento) {
    const poppover = await this.popoverCtrl.create({
      component: PopoverInfoComponent,
      event: evento,
      mode: 'ios',
      // para q no se pueda cerrar
      backdropDismiss: false
    });

    await poppover.present();

    // tarda un poco mas ,portque cuando se cierra el modal recien ahi te muestra los datos
    // const { data } = await poppover.onDidDismiss();

    // cuando se valla a cerrar que te escupa los datos. 
    const { data } = await poppover.onWillDismiss();



    console.log('Padre', data);
  }

}
