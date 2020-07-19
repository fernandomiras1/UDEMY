import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameSerice: GameService) { }

  ngOnInit(): void {
    this.gameSerice.getNominados()
      .subscribe(resp => {
        this.juegos = resp;
    });
  }


  votarJuego(juego: Game) {
    console.log(juego);
    this.gameSerice.votarJuego(juego.id).subscribe((resu: { ok: boolean, mensaje: string }) => {
      console.log(resu);
      if (resu.ok) {
        Swal.fire('Gracias', resu.mensaje, 'success');
      } else {
        Swal.fire('Oops', resu.mensaje, 'error');
      }
    });
  }

}
