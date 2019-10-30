import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

const NUMBER_REGEXP = /^\d+$/;
const ALPHANUMBER_REGEXP = /^[a-z0-9]+$/i;
const DATE_SIN_BARRAS_REGEXP = /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([12]\d{3})/m;
const EMAIL_REGEXP = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

// tslint:disable-next-line: max-line-length
const DATE_REGEXP = /^(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

// tslint:disable-next-line:max-line-length
const PIN_REGEXP = /([0-9])\1|^(^0123$|^1234$|^2345$|^3456$|^4567$|^5678$|^6789$|^3210$|^4321$|^5432$|^6543$|^7654$|^8765$|^9876$|^0000$|^1111$|^2222$|^3333$|^4444$|^5555$|^6666$|^7777$|^8888$|^9999$)$/i;
// tslint:disable-next-line:max-line-length
const PHONE_REGEXP = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/gm;

export function isEmpty(value: any): boolean {
  return (typeof value === 'string' && value === '');
}

@Injectable()
export class CustomValidators {

  static cuilSinGuiones(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    const esNumero = NUMBER_REGEXP.test(control.value);
    const largoCorrecto = control.value.length === 11;
    return esNumero && largoCorrecto ? null : { cuil: true };
  }

  static number(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return NUMBER_REGEXP.test(control.value) ? null : { number: true };
  }

  static email(control: AbstractControl) {
    if (isEmpty(control.value)) {
      return null;
    }
    return EMAIL_REGEXP.test(control.value) ? null : { email: true };
  }

  static pin(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return PIN_REGEXP.test(control.value) ? { pin: true } : null;
  }

  static minValue(minValue: number): ValidatorFn {

    const aux = (control) => {
      const number = CustomValidators.number(control);

      if ((number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const value = Number(control.value);

      return isNaN(value) || (value < minValue) ?
        { minvalue: { requiredValue: minValue, actualValue: control.value } } :
        null;
    };
    return aux;
  }

  static pattern(regExp: any): ValidatorFn {

    const aux = (control) => {

      if (isEmpty(control.value)) {
        return null;
      }
      const reg = new RegExp(regExp);

      return reg.test(control.value) ? null : { pattern: true };
    };
    return aux;
  }

  static maxValue(maxValue: number) {
    const aux = (control) => {

      const number = CustomValidators.number(control);

      if ((number)) {
        return number;
      }

      if (isEmpty(control.value)) {
        return null;
      }

      const value = Number(control.value);

      return isNaN(value) || (value > maxValue) ?
        { maxvalue: { requiredValue: maxValue, actualValue: control.value } } :
        null;
    };
    return aux;
  }

  static maxlength(maxLength: number) {
    const aux = (control) => {

      if (isEmpty(control.value)) {
        return null;
      }

      const length = control.value.length;

      return length > maxLength ?
        { maxlength: { requiredLength: maxLength, actualValue: length } } :
        null;

    };
    return aux;
  }

  static minlength(minLength: number) {
    const aux = (control) => {

      if (isEmpty(control.value)) {
        return null;
      }

      const length = control.value.length;

      return length < minLength ?
        { minlength: { requiredLength: minLength, actualValue: length } } :
        null;

    };
    return aux;
  }

  static alphanumber(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return ALPHANUMBER_REGEXP.test(control.value) ? null : { alphanumber: true };
  }

  // usado para los tetfiels con mascaras integrdas
  static dateSinBarras(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return DATE_SIN_BARRAS_REGEXP.test(control.value) ? null : { dateSinBarras: true };
  }

  static date(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return DATE_REGEXP.test(control.value) ? null : { date: true };
  }

  static phone(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return null;
    }
    return PHONE_REGEXP.test(control.value) ? null : { phone: true };
  }

  static itemsFilterEmpty(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return { itemsFilterEmpty: true };
    }
    return null;
  }

  static cbu(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)) {
      return { cbu: true };
    }
    return null;
  }
}

export class ErrorMessages {
  static messageOf(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'El campo es requerido',
      alphanumber: 'Ingresar sólo letras y/o números',
      number: 'Ingresar sólo números',
      email: 'El email es inválido',
      cuil: `No tiene el formato correcto.`,
      pin: `Revisá los requisitos.`,
      itemsFilterEmpty: `No hay elementos.`,
      phone: `Teléfono inválido`,
      dateSinBarras: `La fecha ingresada no tiene el formato válido`,
      date: `La fecha ingresada no tiene el formato válido`,
      cbu: `El cbu ingresado es inválido`,
      ...(validatorValue && validatorValue.requiredLength) ? {
        maxlength: `No superar los ${validatorValue.requiredLength} caracteres`,
        minlength: `Ingresar al menos ${validatorValue.requiredLength} caracteres`,
        minvalue: `El valor mínimo es ${validatorValue.requiredValue}`,
        maxvalue: `El valor máximo es ${validatorValue.requiredValue}`
      } : {}
    };
    return config[validatorName];
  }
}
