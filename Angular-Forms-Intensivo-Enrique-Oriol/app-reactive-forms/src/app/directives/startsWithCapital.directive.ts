import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';


export function startsWithCapitalValidator(): ValidatorFn {
   // ValidatorFn: debe retornar un validatorError o null
    // AbstractControl: un control de Formulario
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
          // si no hay contendio, desactivo el validador cono si no hubiera ningun error
          return null;
        }
        // El primero elemento entre la A y la Z Mayusculas y luego uso el test para compararlo con control.value
        const valid = /^[A-Z]/.test(control.value);
        // si no se cumple devolvemos un objeto con el nombre del error. y la info que quiero mostar
        return valid ? null : {startsWithCapital: {value: control.value}};
    };
}

@Directive({
  selector: '[startsWithCapital]',
  // useExisting: Le indicamos que tiene que usar la intancia concrea del validador en ves de la clase
  // multi: permite agregar este validado personalizdo a los NG_VALIDATORS de angular.
  providers: [{provide: NG_VALIDATORS, useExisting: StartsWithCapitalValidatorDirective, multi: true}]
})
export class StartsWithCapitalValidatorDirective implements Validator {
  // se usa el selector de la directiva como input.
  @Input('startsWithCapital') isActive: boolean;

  // Te obliga a usar el metodo validate cuando hacemos un implements Validator
  validate(control: AbstractControl): (ValidationErrors | null) {
      return !this.isActive ? null : startsWithCapitalValidator()(control);
  }
}
