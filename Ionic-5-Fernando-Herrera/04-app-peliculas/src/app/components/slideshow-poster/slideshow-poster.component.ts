import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../models/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss']
})
export class SlideshowPosterComponent implements OnInit {

  @Input() posters: Pelicula[] = [];

  slideOpts = {
    // se va a ver un slide y un poquito del otro
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor() { }

  ngOnInit() {
  }

}
