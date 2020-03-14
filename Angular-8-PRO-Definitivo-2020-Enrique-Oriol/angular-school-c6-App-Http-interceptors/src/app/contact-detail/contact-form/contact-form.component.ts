import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Contact, PhoneType } from 'src/app/contact.model';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { startsWithCapitalValidator } from 'src/app/directives/startsWithCapital.directive';
import { filter, map } from 'rxjs/operators';
import { zip } from 'rxjs';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() contact:Contact;
  @Output() submitContact:EventEmitter<Contact> = new EventEmitter();
  @Output() valueChanges:EventEmitter<Contact> = new EventEmitter();
  
  public readonly phoneTypes:string[] = Object.values(PhoneType);
  private pictureFile:File = null;

  public contactForm = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(2), startsWithCapitalValidator() ]],
    picture: ['assets/default-user.png'],
    phones: this.fb.array([
      this.fb.group({
        type: [null],
        number: ['']
      })
    ]),
    email: [''],
    address: ['']
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit(){
    //init contact from input, if exists
    if(this.contact)
      this.setContact(this.contact);

    //emit value changes only when status is valid
    zip(this.contactForm.statusChanges, this.contactForm.valueChanges).pipe(
      filter( ([state, value]) => state == 'VALID' ),
      map(([state, value]) => value),
    ).subscribe(formValue => {
      this.valueChanges.emit(formValue);
    });
  }

  submitForm(){
    //emit submission
    this.submitContact.emit({...this.contactForm.value, pictureFile:this.pictureFile});
    //reset form
    this.contactForm.reset({
      picture:'assets/default-user.png',
    });
    //and clear structure
    this.phones.clear();
    this.addNewPhoneToModel();
  }

  //update contact form values from input contact
  private setContact(contact){
    this.contactForm.reset();
    this.phones.clear();
    for(let i=0; i< contact.phones.length; i++){
      this.addNewPhoneToModel();
    }
    //extract picture file from contact, so there's no missmatch with form structure
    const {pictureFile, ...cleanContact} = contact;
    this.contactForm.setValue(cleanContact);
  }

  //add new phone to the phones array
  addNewPhoneToModel(){
    this.phones.push(
      this.fb.group({
        type: [null],
        number: ['']
      })
    );
  }

  //add image to the form, from file input
  addImage(event){
    const file = event.target.files[0];
    this.pictureFile = file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      this.contactForm.patchValue({
        picture:reader.result
      });
    }
  }

  get name(){
    return this.contactForm.get('name');
  }

  get phones(){
    return this.contactForm.get('phones') as FormArray;
  }

}
