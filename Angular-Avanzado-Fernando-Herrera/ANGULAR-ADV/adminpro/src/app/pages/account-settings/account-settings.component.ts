import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajuestes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: any): void {
   this.aplicarCheck(link);
   this._ajuestes.aplicarTema(tema);
  }

  // Le agregamos la palaba 'working' a la clase. Pero en ves de usar ngClass. Usamos este metodo.
  aplicarCheck(link: any): void {
   const selectores: any = document.getElementsByClassName('selector');
   // recoremos un forEach a cada componente que tenga la clase selector o el nombre selector.
   for (const ref of selectores) {
     // removemos la clase donde conteca el working
     ref.classList.remove('working');
   }

   link.classList.add('working');
  }


  colocarCheck(): void {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajuestes.ajustes.tema;
    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
          // Agregamos la clase donde conteca el working
          ref.classList.add('working');
          // Salimos del metodo For.
          break;
      }
    }
  }


}
