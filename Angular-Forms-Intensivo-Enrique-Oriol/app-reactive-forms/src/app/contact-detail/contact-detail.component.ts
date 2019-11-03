import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  public contact:Contact;

  constructor(
    public contactsService:ContactsService, 
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.contact = data.contact);
  }

}
