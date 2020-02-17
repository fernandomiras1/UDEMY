import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact, PhoneType } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  public contact:Contact;

  constructor(public contactsService:ContactsService) {
  }

  ngOnInit() {
    this.contact = new Contact(1, "Albert", "assets/default-user.png", [
      {type:PhoneType.work, number:93200621621 },
      {type:PhoneType.home, number:93444001100 },
      {type:PhoneType.mobile, number:629304050 } 
    ], "albert@email.com", "Villaroel 52, 08027, Barcelona" );
  }

}
