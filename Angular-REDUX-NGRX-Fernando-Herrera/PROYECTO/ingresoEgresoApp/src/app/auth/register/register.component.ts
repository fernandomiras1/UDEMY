import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public onSubmit(f: FormControl): void {
    console.log(f);
  }

}
