import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, HostListener } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, AfterViewInit {

  public isStickyHeader = false;
  // Te permite acceder a un Component Hijo en tu vista. Todos los metodos publicos tenemos accceso
  // ViewChild: selecciona un solo elemento.
  // ViewChildren: selecciona una lista de elementos, que son QuertList. En este caso son  todos las card de contacto
  @ViewChildren(ContactComponent) contactsComponents: QueryList<ContactComponent>;
  public selectedContact: number = null;
  public contacts: Contact[] = [];
  constructor(public contactsService: ContactsService) { }

  // Va a estar escuchando en el DOM el even to Scroll
  @HostListener('window:scroll', ['$event'])
  private handleScroll($event: Event) {
    if ($event.srcElement.children[0].scrollTop > 20 && !this.isStickyHeader) {
      this.isStickyHeader = true;
    } else if ($event.srcElement.children[0].scrollTop <= 20 && this.isStickyHeader) {
      this.isStickyHeader = false;
    }
  }

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
