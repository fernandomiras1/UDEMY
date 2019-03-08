import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // Inyectamos el documento del DOM (MANIPULAMOS EL DOM)
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(): void {
    // console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(): void {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargando del LocalStrorage');
    } else {
      // console.log('Usando valores por defecto');
    }
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: string): void {

    //  necesito usar el DOM de toda la aplicacion para poder llegar al index.html
    // ( <link id="tema" href="assets/css/colors/default-dark.css" id="theme" rel="stylesheet"> )
    // De esta manera necesito buscar el id='tema' y poder modificar el href para poder cambiar el color del template.
    // Modificando la ultila linea del href. working

    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    // guardamos en el LocalStrorage.
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();

  }
}


interface Ajustes {
 temaUrl: string;
 tema: string;
}
