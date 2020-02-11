import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;
  @Input() expanded = false;
  @Input() openCard = true;
  @Output() clicked: EventEmitter<number> = new EventEmitter();
  @Output() clickedService: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clicked.emit(this.contact.id);
  }

  onServiceClick() {
    this.clickedService.emit(this.contact.id);
  }

}
