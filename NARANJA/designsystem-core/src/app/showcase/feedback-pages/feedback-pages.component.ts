import { Component } from '@angular/core';
import { WindowService } from '../../../lib/src/utils/services/window/window.service';

@Component({
  selector: 'dsn-feedback-pages',
  templateUrl: './feedback-pages.component.html',
  styleUrls: ['./feedback-pages.component.scss']
})
export class FeedbackPagesComponent {

  description = 'Son páginas que dan respuesta a una acción del cliente.';
  link = 'https://brandbook.naranja.com/document/248804#/layouts/feedback-pages';

  constructor(private windowService: WindowService) {
  }

  goToLink(url: string) {
    this.windowService.nativeWindow.open(url, '_blank');
  }
}
