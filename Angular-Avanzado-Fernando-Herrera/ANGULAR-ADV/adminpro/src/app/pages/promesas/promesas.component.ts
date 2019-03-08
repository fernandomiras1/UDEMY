import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  nombres: string[] = [ 'Jose', 'Carlos', 'Gabriela', 'Alfredo', 'Maria', 'Angelica'];
  constructor() {

    this.contarTres().then(mensaje => {
      console.log('Termino!', mensaje);
    }).catch(error => { console.error('Error en la Promesa', error); });

    // Otro Ejemplo del uso de la Promesa.
    this.FindName('Jose', 'Gabriela')
    .then ( nombre => console.log('Usuario encontrado, nombre:' + nombre))
    .catch ( error => console.log(error));

   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      let contador = 0;
      // intervalo de tiempo . x tiempo se ejecuta la funcion
      const intervalo = setInterval(() => {

       contador += 1;
       console.log(contador);
       if ( contador === 3 ) {
         resolve(true);
         // terminamos el intervalo
         clearInterval(intervalo);
       }

      }, 1000);
    });
  }

  FindName(...name: string[]): Promise<string[]> {
    return new Promise( (resolve, reject) => {

      this.nombres.forEach((element, index) => {
        if ( element === name[index]) {
          resolve(name);
        } else {
          reject('error, el nombre no existe');
        }
      });
    });
   }

}
