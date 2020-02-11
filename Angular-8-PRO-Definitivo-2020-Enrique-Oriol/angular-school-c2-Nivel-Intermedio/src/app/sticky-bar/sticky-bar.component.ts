import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sticky-bar',
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.scss']
})
export class StickyBarComponent implements OnInit {

  public isSticky = false;
  constructor() { }

  ngOnInit() {
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
