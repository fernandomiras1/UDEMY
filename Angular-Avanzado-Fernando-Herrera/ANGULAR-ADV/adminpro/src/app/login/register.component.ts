import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
        // Llamamos a la funcion creada en custom.js
        init_plugins();

        this.forma = new FormGroup({
           nombre: new FormControl(null, Validators.required),
           correo: new FormControl(null, [Validators.required, Validators.email]),
           password: new FormControl(null, Validators.required),
           password2: new FormControl(null, Validators.required),
           condiciones: new FormControl(false)
        }, { validators: this.sonIguales('password', 'password2') });


        this.forma.setValue({
          nombre: 'Test',
          correo: 'test@test.com',
          password: '123',
          password2: '123',
          condiciones: true
        });
  }

  public sonIguales(campo1: string, campo2: string) {

    return ( group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2) {
        return null;
      }
     // Si devuelve un true, salta la validacion en el formulario.
      return { sonIguales: true };
    };
  }


  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    console.log('Forma valida', this.forma.valid);
    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resu => this.router.navigate(['/login']));
  }

}
