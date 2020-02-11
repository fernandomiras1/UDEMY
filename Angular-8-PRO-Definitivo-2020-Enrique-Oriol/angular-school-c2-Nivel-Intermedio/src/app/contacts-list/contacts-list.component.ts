import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, AfterViewInit {

  // Te permite acceder a un Component Hijo en tu vista. Todos los metodos publicos tenemos accceso
  // ViewChild: selecciona un solo elemento.
  // ViewChildren: selecciona una lista de elementos, que son QuertList. En este caso son  todos las card de contacto
  @ViewChildren(ContactComponent) contactsComponents: QueryList<ContactComponent>;
  public selectedContact: number = null;
  public contacts: Contact[] = [];
  constructor(public contactsService: ContactsService) { }

  ngOnInit() {
    this.contacts = this.contactsService.getContacts();
  }

  ngAfterViewInit() {
    console.log(this.contactsComponents);
    this.contactsComponents.forEach(contact => {
      console.log(contact);
    });
  }

  onContactSelected(id: number) {
    this.selectedContact = id;

    this.contactsComponents.forEach(item => {
      if (item.contact.id === this.selectedContact) {
        item.expanded = !item.expanded;
      } else {
        item.expanded = false;
      }
    });

  }

  onContactSelectedService(id: number) {
    this.contactsService.selectContactById(id);
  }

}
