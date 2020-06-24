import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../models/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas: EventEmitter<void> = new EventEmitter();
  slideOpts = {
    // se va a ver un slide y un poquito del otro
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };
  
  constructor() { }

  ngOnInit() {}
  
  onClick() {
    this.cargarMas.emit();
  }

}
