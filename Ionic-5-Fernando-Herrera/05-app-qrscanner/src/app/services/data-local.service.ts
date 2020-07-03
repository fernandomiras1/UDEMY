import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(private storage: Storage,
              private navCtrl: NavController,
              private inAppBrowser: InAppBrowser,
              private file: File,
              private emailComposer: EmailComposer) {
    // cargar registros
    this.cargarStorage();
  }

  async cargarStorage() {
    this.guardados = await this.storage.get('registros') || [];
  }


  async guardarRegistro( format: string, text: string ) {

    // traemos primero los datos del stroage. para luego cargar el nuevo. 
    await this.cargarStorage();

    const nuevoRegistro = new Registro( format, text );
    this.guardados.unshift( nuevoRegistro ); // al principio del array

    console.log(this.guardados);
    this.storage.set('registros', this.guardados); // save en localStroage

    this.abrirRegistro( nuevoRegistro );

  }

  abrirRegistro( registro: Registro ) {

    // se puede hacer con el router o navCtrl, vamos a navegar a la ruta del historial.
    this.navCtrl.navigateForward('/tabs/tab2');

    switch ( registro.type ) {

      case 'http':
        // abrir el navegador web por defecto.
        this.inAppBrowser.create( registro.text, '_system' );
      break;

      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${ registro.text }`);
      break;

    }


  }

  enviarCorreo() {

    const arrTemp = [];
    // \n para terminar la linea, es como hacer un enter. ( salto de linea )
    const titulos = 'Tipo, Formato, Creado en, Texto\n'; // Encabezado de cada una de las columnas.

    arrTemp.push( titulos );

    this.guardados.forEach( registro => {

      const linea = `${ registro.type }, ${ registro.format }, ${ registro.created }, ${ registro.text.replace(',', ' ') }\n`;

      arrTemp.push( linea );

    });

    console.log('arrTemp', arrTemp.join(''));
    this.crearArchivoFisico( arrTemp.join('') );

  }

  crearArchivoFisico( text: string ) {

    this.file.checkFile( this.file.dataDirectory, 'registros.csv' ) // para saber si exite el directorio
      .then( existe => {
        console.log('Existe archivo?', existe );
        return this.escribirEnArchivo( text );
      })
      .catch( err => {

        return this.file.createFile( this.file.dataDirectory, 'registros.csv', false ) //creamos el registro: false no lo deso reemplazar
          .then( creado => this.escribirEnArchivo( text ) )
          .catch( err2 => console.log( 'No se pudo crear el archivo', err2 ));
      });
  }

  async escribirEnArchivo( text: string ) {

    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text );

    const archivo = `${this.file.dataDirectory}/registros.csv`;
    console.log(this.file.dataDirectory + 'registros.csv');
    // enviamos por correo electronico el csv. 
    const email = {
      to: 'fernando.miras.pc@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [ // adjuntos
        archivo
      ],
      subject: 'Backup de scans',
      body: 'Aquí tienen sus backups de los scans - <strong>ScanApp</strong>',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }

}
