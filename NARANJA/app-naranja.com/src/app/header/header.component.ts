import { isPlatformBrowser } from '@angular/common';
import {
  PLATFORM_ID,
  Component,
  Inject,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
// import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('homeState', [

      state('hide', style({
        transform: 'translateY(0%)'
      })),
      state('show', style({
        transform: 'translateY(-100%)'
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements AfterViewChecked, OnInit {

  public showHeader = true;
  private lastScrollTop = 0;
  private navHeight = 0;
  @ViewChild('nav') nav: ElementRef;

  constructor() { }

  // uso este metodo para cuando carge todo el sitio recien ahi verificar el tamaño del header.
  // Termina de renderizar todo el sitio.
  ngAfterViewChecked(): void {
    this.navHeight = this.nav.nativeElement.offsetHeight;
    document.body.style.marginTop = `${this.navHeight}px`;
  }

  ngOnInit() {
  }

  @HostListener('window:scroll')
  private handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop && this.navHeight < st) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

}
