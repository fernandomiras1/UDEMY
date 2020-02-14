import { Component, OnInit, HostListener, ContentChild, ContentChildren, QueryList , AfterContentInit, ElementRef } from '@angular/core';
import { BarButtonComponent } from '../bar-button/bar-button.component';

@Component({
  selector: 'app-sticky-bar',
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.scss']
})
export class StickyBarComponent implements OnInit, AfterContentInit {

  // Podemos acceder a los elementos proyectos por ng-content
  // le tenes que espeficiar el elemento que tiene que detectar
  @ContentChild(BarButtonComponent) barButton: BarButtonComponent;
  // ContentChildren: selecciona una lista de elementos proyectados
@ContentChildren(BarButtonComponent) barButtons: QueryList<BarButtonComponent>;
  @ContentChild('barHeader') barHeader: ElementRef;
  public isSticky = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    // capturamos el nombre del primer btn
    console.log(this.barButton.button.nativeElement.innerText);
    // camputaros el h1 mediante template Referance Varable
    console.log(this.barHeader.nativeElement.innerText);
    this.barButtons.forEach(item => {
      item.button.nativeElement.disabled = true;
      console.log(item); 
    });
  }

  // Va a estar escuchando en el DOM el even to Scroll
  @HostListener('window:scroll', ['$event'])
  private handleScroll($event: Event) {
    if ($event.srcElement.children[0].scrollTop > 20 && !this.isSticky) {
      this.isSticky = true;
    } else if ($event.srcElement.children[0].scrollTop <= 20 && this.isSticky) {
      this.isSticky = false;
    }
  }


}
