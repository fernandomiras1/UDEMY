import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, AfterViewInit {

  @ViewChild(ContactComponent) someContact:ContactComponent;
  public selectedContact:number = null;
  public contacts:Contact[] = [];
  constructor(public contactsService:ContactsService, private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  ngAfterViewInit(){
    console.log(this.someContact);
    this.someContact.expanded = true;
    this.cdRef.detectChanges();
  }

  onContactSelected(id:number){
    this.selectedContact = this.selectedContact === id ? null : id;
  }

}
