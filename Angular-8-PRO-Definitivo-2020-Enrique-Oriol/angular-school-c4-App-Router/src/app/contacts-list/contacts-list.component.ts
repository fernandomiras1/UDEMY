import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  public contacts:Contact[] = [];
  constructor(public contactsService:ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactsService.contacts;
  }

  onContactSelected(id:number){
    //navigate to contact-detail    
  }

}
