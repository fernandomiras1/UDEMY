import { Component, OnInit, Input, ViewChild } from '@angular/core';


declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa;

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);


    mapboxgl.accessToken = 'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJjanJlMWVnMWExdWFkM3lwZzBwMHRtaWU4In0.nH9Y2UtH05u1AhJEq3jHNw';
    const map = new mapboxgl.Map({
      container:  this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
    });

    const marker = new mapboxgl.Marker()
        .setLngLat( [ lng, lat ] )
        .addTo( map );


  }

}
