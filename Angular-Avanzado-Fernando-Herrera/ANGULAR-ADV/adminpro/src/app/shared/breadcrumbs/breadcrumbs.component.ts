import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  constructor(private router: Router, private title: Title, private meta: Meta) {

    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;
      // Agregamos el titulo en la pestaña del google Chrome.
      this.title.setTitle( this.titulo );

      const metaTag: MetaDefinition = {
       name: 'description',
       content: this.titulo
     };

     this.meta.updateTag( metaTag );

    });
  }

  ngOnInit() {
  }

  // Lo que vamos hacer aca es recuperar el titulo del data, que se encuetra en el router.
  // ( A si sabremos en que pagina estamos y pegamos el titulo en la cabezera)
  getDataRoute() {

   return this.router.events.pipe(
      // Aca usamos rtodos nuestros operadores.
      // Si el evento es una instancia de ActivationEnd ( Algo propiamente del Router) que te filtre por eso.
      filter((event =>  event instanceof ActivationEnd)),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) =>  event.snapshot.data)
     );

  }

}
