import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: {name: string, value: number}[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    // obtener la referencia a mi base de datos
    // valueChanges: cuando cualquier valor cambie en la base de datos, va a disparar este metodo.
    // TIEMPO REAL
    this.db.collection('goty').valueChanges().pipe(
      map((resp: Game[]) => resp.map(({ name, votos}) => ({ name, value: votos}) )) // modifico la salida para que se vea como {name, value}
    ).subscribe(emit => {
        console.log(emit);
        this.juegos = emit;
    });
  }

}
