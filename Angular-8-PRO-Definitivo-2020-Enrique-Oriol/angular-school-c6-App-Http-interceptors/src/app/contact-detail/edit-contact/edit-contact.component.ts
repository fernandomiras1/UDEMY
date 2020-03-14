import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/contact.model';

@Component({
  selector: 'app-edit-contact',
  template: `<app-contact-form 
              [contact]="contact" 
              (submitContact)="updateContact($event)">
              Update contact
            </app-contact-form>`
})
export class EditContactComponent implements OnInit {
  public contact:Contact;
  public id:number;
  constructor(
    public contactService:ContactsService, 
    public route:ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      //use spread operator to separate id from the rest of the contact field
      const {id, ...contact} = data.contact;
      this.contact = contact;
      this.id = id;
    });
  }

  updateContact(formContact){
    this.contactService.updateContact({id:this.id, ...formContact})
    .subscribe(response => {
      this.router.navigate(['/']);
    });
  }

}
