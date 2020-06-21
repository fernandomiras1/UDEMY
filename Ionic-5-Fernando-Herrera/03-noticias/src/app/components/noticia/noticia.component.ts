import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/interface';
import { ActionSheetController, Platform } from '@ionic/angular';

// Plugin
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private socialSharing: SocialSharing,
              private platform: Platform,
              private dataLocalService: DataLocalService) { }

  ngOnInit() {
  }

  openNoticia() {
    // abrir url del dispocitio por defecto del mobile
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {
    let guardarBorrarBtn;
    if ( this.enFavoritos ) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          this.compartirNoticia();
        }
      },
      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }


  compartirNoticia() {
    // Si puedo utilizar cordova
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
    } else {
      if (navigator['share']) {
        navigator['share']({
          title: this.noticia.title,
          text: this.noticia.description,
          url: this.noticia.url
        })
        .then(() => console.log('noticia share'))
        .catch((err) => console.log('Error', err))
      } else {
        console.log('no soporta el share el navegador');
      }
    }
  }

}
