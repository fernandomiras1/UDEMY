import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar } from '@angular/material';
import { ButtonOpts } from 'mat-progress-buttons';
import { ButtonService } from 'src/app/services/ui/buttons.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  barButtonOptions: ButtonOpts;
  spinnerButtonOptions: ButtonOpts;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private authService: AuthService, private fb: FormBuilder, public snackBar: MatSnackBar, private buttonService: ButtonService, private route: Router) {
  }

  ngOnInit() {
    this.barButtonOptions = this.buttonService.barButton('Login', 'primary', 'primary');
    this.spinnerButtonOptions = this.buttonService.spinnerButton('Login', 22, 'primary', 'primary');
    this.authService.logoutUser();
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.spinnerButtonOptions.active = true;
      this.spinnerButtonOptions.text = 'Cargando datos...';
      this.authService.login(this.form.value).subscribe(data => {
          this.snackBar.open('Logeado Correctamente', 'Aceptar', {
           duration: 2000
          });
        }, error => {
         this.spinnerButtonOptions.active = false;
         this.spinnerButtonOptions.text = 'Login';
         this.snackBar.open('Usuario y/o Contraseña Incorrecta', 'Aceptar', {
            duration: 3000
          });
        }, () => {
          this.route.navigate(['/home']);
        });
    }
    this.formSubmitAttempt = true;
  }

}
