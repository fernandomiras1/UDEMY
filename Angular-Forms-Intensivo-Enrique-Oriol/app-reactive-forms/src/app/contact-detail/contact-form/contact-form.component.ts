import { Component, OnInit } from '@angular/core';
import { Contact, PhoneType } from 'src/app/contact.model';
import { ContactsService } from 'src/app/contacts.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  // no quiero modificar esta propiedad. Va almacenar todos los valores del enum PhoneTypes.
  public readonly phoneTypes:string[] = Object.values(PhoneType);
  public contactForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    picture: new FormControl('assets/default-user.png'),
    phone: new FormGroup({
      type: new FormControl(null),
      number: new FormControl('')
    }),
    email: new FormControl(''),
    address: new FormControl('')
  });

  constructor(private contactsService:ContactsService) { }

  ngOnInit() {
  }

  addContact(){
  }

  addNewPhoneToModel(){
  }

  addImage(event){
    const file = event.target.files[0];
    var reader = new FileReader();
    // Cargamos la ruta en base 64
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
       //  cuando se pase a base 64 la pasamos al model del objeto
      this.contactForm.patchValue({
        picture:reader.result
      });
    }
  }

}
