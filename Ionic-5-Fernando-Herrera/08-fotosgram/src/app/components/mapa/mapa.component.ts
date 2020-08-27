import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  @ViewChild('mapa') mapa: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm1pcmFzIiwiYSI6ImNqemFpa2xzNzAweTUzb3BhYm1semYxeGMifQ.TDVOi8JOF-KYTtydm5EfoA';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
    });

    // Marker
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  }

  ngOnInit() {
  }

}
