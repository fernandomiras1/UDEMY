import { Component, OnInit } from '@angular/core';
import { Contact, PhoneType } from 'src/app/contact.model';
import { ContactsService } from 'src/app/contacts.service';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { startsWithCapitalValidator } from 'src/app/directives/startsWithCapital.directive';
import { zip } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  // no quiero modificar esta propiedad. Va almacenar todos los valores del enum PhoneTypes.
  public readonly phoneTypes: string[] = Object.values(PhoneType);

  // PODEMOS BORRAR contactFormOld ya que se crea con FormGroup. ( Lo dejo a modo de visual. Entre FormGroup y FormBuilder)
  public contactFormOld: FormGroup = new FormGroup({
    // startsWithCapitalValidator() tenemos que ejecutar la funcion para que me devuela los validadoes. Ya que es una factoria
    name: new FormControl('', [Validators.required, Validators.minLength(2), startsWithCapitalValidator()]),
    picture: new FormControl('assets/default-user.png'),
    // como los telefonos son un array lo tenemos q inicializar con un array vacio.
    phones: new FormArray([
      // El primer objeto que va a tener el Array es el FormGroup que en su interior tiene type y numero
      new FormGroup({
        type: new FormControl(null),
        number: new FormControl('')
      })
    ]),
    email: new FormControl(''),
    direction: new FormControl('')
  });

  // FormBuilder: lo creamos con FormBuilder ya que simplifica la sintasis de la creacion del Fomulario. Mas ordenado
  // El plantamiento es el mimsmo pero mas compacto
  public contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), startsWithCapitalValidator()]],
    picture: ['assets/default-user.png'],
    phones: this.fb.array([
      this.fb.group({
        type: [null],
        number: ['']
      })
    ]),
    email: [''],
    direction: ['']
  });


  constructor(private contactsService: ContactsService, private fb: FormBuilder) { }

  ngOnInit() {

    // Recuperamos los datos del Formulario al cargar la pagina.
    // Comprobamos si tengo el contancto en localStorage
    const contact = localStorage.getItem('contact');
    if (contact) {
      const contactJSON = JSON.parse(contact);
      // Limpiamos los phones del Formulario. Ya que vamos agregar los que estan en el localStorage
      this.phones.clear();
      // iteramos sobre el array de telefonos y creamos el nuevo FormArray
      for ( const phone of contactJSON.phones) {
        this.addNewPhoneToModel();
      }
      // Usamos setValue para actualizar todo el contendio de este contactForm.
      this.contactForm.setValue(contactJSON);
    }

    // Necesito almacenar el estado y el valor del formulario. Combiamos estos dos eventos con la funcion zip
    // zip: lo que hace es combianar de forma ordenada los eventos de varios observables.
    // Va a estar escuchado cambios de esos operadoes. en la posicion 0 y 1
    zip(this.contactForm.statusChanges, this.contactForm.valueChanges).pipe(
      // Filtarmos solo el estatus Valido. Que lo que nos interesa.
      filter( ([state, value]) => state === 'VALID'),
      // modificamos el string de datos, nos quedmos solo con el valor del formulario
      map(([state, value]) => value),
      // Tap: para ver exactamente que se esta emitiendo
      tap(data => console.log(data))
    ).subscribe( formValue => {
      // Guardamos el value del formulario en el localStorage
      localStorage.setItem('contact', JSON.stringify(formValue));
    });
  }

  addContact() {
    // tenemos un servicio para guardar el contacto
    this.contactsService.addContact(this.contactForm.value);
    // Limpiamos el FormArray de los phones
    this.phones.clear();
    this.addNewPhoneToModel();
    // limpiamos el Formulario y seteamos la imagen por defecto.
    // reset: Mantiene la estructura del formulario
    this.contactForm.reset({
      picture: 'assets/default-user.png'
    });
    localStorage.removeItem('contact');
  }

  // Añadimos nuevos telefonos en el FormArray
  addNewPhoneToModel() {
    // Accedemos al geter phones.
    this.phones.push(
      this.fb.group({
        type: [null],
        number: ['']
      })
      // forma vieja con FormGroup
      // new FormGroup({
      //   type: new FormControl(null),
      //   number: new FormControl('')
      // })
    );
  }

  addImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    // Cargamos la ruta en base 64
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
       //  cuando se pase a base 64 la pasamos al model del objeto
       // patchValue: actualizo el formulario cuando se carga la imagen.
       // Si queremos modificar alguna de las propiedades del formulario usamos patchValue.
       // setValue( tendriamos que modificar todo el objeto completo, ya que Formularios reactivos son inmutables.)
      this.contactForm.patchValue({
        picture: reader.result
      });
    };
  }

  get name() {
    return this.contactForm.get('name');
  }

  get phones() {
    // Hay que especifiar que va a ser de tipo Array ya que en el template no me va a dejar iterar.
    return this.contactForm.get('phones') as FormArray;
  }

}
