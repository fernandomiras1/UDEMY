import { Marcador } from './marcador';

export class Mapa {
    public marcadores: Marcador[] = [];
    constructor() {}

    getMarcadores() {
        return this.marcadores;
    }

    agregarMarcador( marcador: Marcador ) {
        this.marcadores.push( marcador );
    }

    borrarMarcador(id: string) {
        this.marcadores = this.marcadores.filter( mark => mark.id !== id);
        return this.marcadores;
    }

    moverMarcador( marcador: Marcador ) {

        // Obtener cual es el marcador que tengo que mover
        for ( const i in this.marcadores) {

            if ( this.marcadores[i].id === marcador.id ) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }
}