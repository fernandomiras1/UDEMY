import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact, PhoneType } from '../contact.model';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  public contact: Contact;

  constructor(
    public contactsService: ContactsService,
    public route: ActivatedRoute) {
  }

  ngOnInit() {
   // obtenemo los datos del resolver
   this.route.data.subscribe(data => this.contact = data.contact);
    // Buscamos el parameto de la UR
    // this.route.paramMap.pipe(
    //   tap(params => console.log('Sarasa', params.get('sarasa'))),
    //   map(params => Number(params.get('id')))
    // )
    // .subscribe(id => {
    //   this.contact = this.contactsService.getContactById(id);
    // });

    // Obtenemos los queryParams
    this.route.queryParamMap.subscribe(params => {
      console.log(params);
    });
  }

}
