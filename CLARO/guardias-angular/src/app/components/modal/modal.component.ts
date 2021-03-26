import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() subtitles: string;
  @Input() description: string;

  @Input() textBtnLeft: string;
  @Input() textBtnRight: string;

  @Input() userRol: string;
  @Input() isEdit = true;
  @Input() disabledBtnLeft = false;
  @Input() disabledBtnRight = false;

  @Output() onClickClose: EventEmitter<void> = new EventEmitter();
  @Output() onClickBtnLeft: EventEmitter<void> = new EventEmitter();
  @Output() onClickBtnRight: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.onClickClose.emit();
  }

}
