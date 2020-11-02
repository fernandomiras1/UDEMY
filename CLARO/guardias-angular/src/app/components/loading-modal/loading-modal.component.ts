import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss']
})
export class LoadingModalComponent {

  @Input() showLoadingModal = false;
  @Input() message = 'Cargando datos..';
  @Input() size = 50;

  constructor() { }

}
