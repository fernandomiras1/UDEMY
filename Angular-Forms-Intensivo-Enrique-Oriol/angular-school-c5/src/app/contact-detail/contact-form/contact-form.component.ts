import { Component, OnInit } from '@angular/core';
import { Contact, PhoneType } from 'src/app/contact.model';
import { ContactsService } from 'src/app/contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  // inicilizo un modal de tipo Contact con un id: 0 y string ''
  public model: Contact = new Contact (0, '', 'assets/default-user.png', []);
  // no quiero modificar esta propiedad. Va almacenar todos los valores del enum PhoneTypes.
  public readonly phoneTypes: string[] = Object.values(PhoneType);
  constructor(private contactService: ContactsService) { }

  ngOnInit() {
  }

  addContact() {
    this.contactService.addContact(this.model);
    this.model = new Contact(0, '', 'assets/default-user.png', []);
  }

  addNewPhoneToModel() {
    this.model.phones.push({type: null, number: null });
  }

  addImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    // Cargamos la ruta en base 64
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      //  cuando se pase a base 64 la pasamos al model del objeto
      this.model.picture = String(reader.result);
    }
  }

}
