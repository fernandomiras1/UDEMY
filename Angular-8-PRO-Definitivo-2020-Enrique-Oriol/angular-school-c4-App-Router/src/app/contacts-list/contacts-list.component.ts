import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  public contacts: Contact[] = [];
  constructor(
    public contactsService: ContactsService,
    private router: Router) { }

  ngOnInit() {
    this.contacts = this.contactsService.contacts;
  }

  onContactSelected(id: number) {
    // navigate to contact-detail
    this.router.navigate(['contact-detail', id, {sarasa: 'bar'}], {
      queryParams: {
        hello: 'world',
        affiliatedId: 12352
      }
    });
  }

}
