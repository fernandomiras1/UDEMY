import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Lugar } from '../model/lugar';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild('map') mapaElemet: ElementRef;
  map: google.maps.Map;
  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  lugares: Lugar[] = [];

  constructor(private http: HttpClient, public wsService: WebsocketService) { }

  ngOnInit() {

    this.http.get('http://localhost:5000/mapa').subscribe( (lugares: Lugar[]) => {
      this.lugares = lugares;
      this.cargarMapa();
    });
  
    this.escucharSockets();
  }

  escucharSockets() {

    // marcador-nuevo
    this.wsService.listen( 'marcador-nuevo' ).subscribe( (marcador: Lugar) => {
      this.agregarMarcador( marcador );
    });
    
    // marcador-borrar
    this.wsService.listen( 'marcador-borrar' ).subscribe( (id: string) => {
      for ( const i in this.marcadores ) {
        if ( this.marcadores[i].getTitle() === id) {
          this.marcadores[i].setMap( null );
          break;
        }
      }
    });

    // marcador-mover
    this.wsService.listen( 'marcador-mover' ).subscribe( ( marcador: Lugar) => {
      for ( const i in this.marcadores ) {

         if (this.marcadores[i].getTitle() === marcador.id) {

          const latLng = new google.maps.LatLng( marcador.lat, marcador.lng );
          this.marcadores[i].setPosition( latLng );
          break;
         } 
      }
    });

  }

  cargarMapa() {

    // Latitud y Longitud que quiero mostar en el mapa. Va a ser el centro del mapa ( Lugar de California USA )
    const latLng = new google.maps.LatLng( 37.784679, -122.395936 );

    const mapaOpciones: google.maps.MapOptions = {
      //  Centro del mapa
      center: latLng,
      // El zoom
      zoom: 13,
      // tipo de mapa
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    // Definimos la intancia de mi mapa
    this.map = new google.maps.Map( this.mapaElemet.nativeElement, mapaOpciones );

    // Definimos un evento para cuando hacemos click en cualquier parte del mapa.
    // Vamos a escuchar al evento click en el mapa
    this.map.addListener('click', (coors) => {
      // Agregamos un nuevo marcador
      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo Lugar',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: new Date().toISOString()
      };

      this.agregarMarcador( nuevoMarcador );

      // Emitir evento de socket, agregar marcador
      this.wsService.emit('marcador-nuevo', nuevoMarcador);
    });


    for ( const lugar of this.lugares ) {
     this.agregarMarcador( lugar );
    }

  }

  agregarMarcador( marcador: Lugar ) {

    const latLng = new google.maps.LatLng( marcador.lat, marcador.lng );

    const marker = new google.maps.Marker({
      // Definimos el mapa
      map: this.map,
      // Definimos la animacion con la que queremos que aparezca ( que este reboantado o no)
      animation: google.maps.Animation.DROP,
      // Definimos la posicion donde queremos que este el marcador.
      position: latLng,
      // Que se puedan arastrar ( mover )
      draggable: true,
      // necesitamos tener el id del marcador. 
      title: marcador.id
    });

    // Guardamos nuestro marcador en un array definidos por nosotros. Para saber donde esta y leer su propiedades
    this.marcadores.push( marker );

    const contenido = `<b>${ marcador.nombre }</b>`;
    const infoWindows = new google.maps.InfoWindow({
      content: contenido
    });
    this.infoWindows.push( infoWindows );

     // Esta funcuin se va a disparar cunado alguien haga click en el marcardo
     google.maps.event.addDomListener( marker, 'click', () => {
       // Cerramos todos los infoWindows que esten abiertos
       this.infoWindows.forEach( infoW => infoW.close());
      // Mostrar infoWindows
      infoWindows.open( this.map, marker );
    });

    // Definimos un evento ( doble click)  en los marcardores. Esta funcuin se va a disparar cunado alguien haga doble click en el marcardo
    google.maps.event.addDomListener( marker, 'dblclick', (coors) => {
      // Borramos el marcador
      marker.setMap( null );
      // Disparar un evento de socket, para borrar el marcador
      this.wsService.emit( 'marcador-borrar', marcador.id );
    });


     // Esta funcuin se va a disparar cunado movamos el marcardor
     google.maps.event.addDomListener( marker, 'drag', (coors) => {

      // Extraemos la lotitud y Longitud
      const nuevoMarcado = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre,
        id: marker.getTitle()
      };
      // Disparar un evento de socket, para mover el marcador
      this.wsService.emit( 'marcador-mover', nuevoMarcado );
    });
  }

}
