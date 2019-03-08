import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

   // Asigo esta variable a mi osbervable, a si puedo usarlo en todo el proyecto.
   subscription: Subscription;
  constructor() {

    // Es una trasforamcion de dato el pipe()
   this.subscription = this.regresaObservable().pipe(
      // Intentamos vovler a probar, le podemos pasar la cant de veces que intente.
     // retry(2)
    )
    .subscribe(
      numero => console.log('Sub ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit() {
  }

  // Esta funcion de va a disparar cada vez que yo valla a dejar la pag.
  ngOnDestroy() {
  console.log('La pag se va a cerrar');
  // Cerramos o matamos el proceso que corre el Observable, si no hacemos esto, corre en toda la aplicacion.
  this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {

        contador ++;
        // Hacemos este ejemplo para usar el operador map.
        const salida = {
          valor: contador
        };
        // Notificamos al codigo con el next. En este caso vamos a notificar el contador.
        observer.next(salida);

        // Paramos el Contador en 3, pero el observable sigue escuchando.
        if (contador === 3) {
          clearInterval(intervalo);
          // Con este codigo finalizamos la escucha del observable.
          observer.complete();
        }

        // Cuando este en dos generamos un error
        // if (contador === 2) {
        //  // clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      // Usamos el filter, para filtrar lo que queremos mostrar en pantalla. en este ejemplo los numer impares.
      filter( (valor, index ) => {
       // console.log('Filter', valor, index);

       if ( (valor % 2) === 1) {
         // Impar
         return true;
       } else {
         // par
         return false;
       }

      })
    );

  }


}
