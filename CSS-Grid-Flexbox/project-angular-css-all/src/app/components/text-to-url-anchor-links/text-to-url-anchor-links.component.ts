import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-url-anchor-links',
  templateUrl: './text-to-url-anchor-links.component.html',
})
export class TextToUrlAnchorLinksComponent implements OnInit {
  readonly message =
    'Esto es una prueba, aqui viene don Google www.google.com.ar, ahora con https://www.google.com/';

  ngOnInit() {}
}
