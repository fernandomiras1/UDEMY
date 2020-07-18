// Quiero probrar dos campos.

import { FormularioLogin } from "./formulario";
import { FormBuilder } from '@angular/forms';




describe('Formularios', () => {

  let componente: FormularioLogin;

  // se va a ejecutar antes de cada prueba
  beforeEach(() => {
    // inicializamos esa clase.
    componente = new FormularioLogin(new FormBuilder());
  });


  it('Debe de crear un formulario con dos campos, email y password', () => {

    // espero que el formulario contenta un campo llamado email y password.
    expect(componente.form.contains('email')).toBeTruthy();
    expect(componente.form.contains('password')).toBeTruthy();
  });

  it('El email debe de ser obligatorio', () => {

    const control = componente.form.get('email');
    control.setValue('');

    expect( control.valid ).toBeFalsy();

  });

  it('El email debe de ser un correo valido', () => {

    const control = componente.form.get('email');
    control.setValue('fernando@gmail.com'); // no es un correo valido

    expect( control.valid ).toBeTruthy();

  });

});
