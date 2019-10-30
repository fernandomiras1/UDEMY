import { CustomValidators } from './custom-validators';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

describe('Custom Validators Test', () => {

  it('should numeric empty', () => {
    const control = new FormControl('');
    const result = CustomValidators.number(control);
    expect(result).toBe(null);
  });

  it('should numeric true', () => {
    const control = new FormControl('123');
    const result = CustomValidators.number(control);
    expect(result).toBe(null);
  });

  it('should numeric false', () => {
    const control = new FormControl('abc');
    const result = CustomValidators.number(control);
    expect(result).toEqual({ number: true });
  });

  it('When the input is a valid email, should return true', () => {
    const control = new FormControl('asd@asd.com', CustomValidators.email);
    expect(control.valid).toBe(true);
  });

  it('When the input is a invalid email, should return false', () => {
    const control = new FormControl('asd', CustomValidators.email);
    expect(control.valid).toBe(false);
  });

  it('should cuil empty', () => {
    const control = new FormControl('');
    const result = CustomValidators.cuilSinGuiones(control);
    expect(result).toBe(null);
  });

  it('should cuil true', () => {
    const control = new FormControl('20348149955');
    const result = CustomValidators.cuilSinGuiones(control);
    expect(result).toBe(null);
  });

  it('should cuil false', () => {
    const control = new FormControl('abc');
    const result = CustomValidators.cuilSinGuiones(control);
    expect(result).toEqual({ cuil: true });
  });

  it('should minValue invalid', () => {
    const control = new FormControl('356', Validators.compose([CustomValidators.minValue(500)]));
    expect(control.status).toEqual('INVALID');
  });

  it('should date invalid', () => {
    const control = new FormControl('abc', Validators.compose([CustomValidators.date]));
    expect(control.status).toEqual('INVALID');
  });

  it('should date is Empty', () => {
    const control = new FormControl('', Validators.compose([CustomValidators.date]));
    expect(control.status).toEqual('VALID');
  });

  it('should date sin barras valid', () => {
    const control = new FormControl('12/02/1990', Validators.compose([CustomValidators.dateSinBarras]));
    expect(control.status).toEqual('INVALID');
  });

  it('should date sin barras no value', () => {
    const control = new FormControl('abc', Validators.compose([CustomValidators.dateSinBarras]));
    expect(control.status).toEqual('INVALID');
  });

  it('should date sin barras is emty', () => {
    const control = new FormControl('', Validators.compose([CustomValidators.dateSinBarras]));
    expect(control.status).toEqual('VALID');
  });

  it('should minValue valid', () => {
    const control = new FormControl('600', Validators.compose([CustomValidators.minValue(500)]));
    expect(control.status).toEqual('VALID');
  });

  it('should pin INVALID', () => {
    const control = new FormControl('600', Validators.compose([CustomValidators.pin]));
    expect(control.status).toEqual('INVALID');
  });

  it('should pin VALID', () => {
    const control = new FormControl('8624', Validators.compose([CustomValidators.pin]));
    expect(control.status).toEqual('VALID');
  });

  it('should minValue empty', () => {
    const control = new FormControl('', Validators.compose([CustomValidators.minValue(500)]));
    expect(control.status).toEqual('VALID');
  });

  it('should minValue not numeric', () => {
    const control = new FormControl('abc', Validators.compose([CustomValidators.minValue(500)]));
    expect(control.status).toEqual('INVALID');
  });

  it('should maxValue valid', () => {
    const control = new FormControl('356', Validators.compose([CustomValidators.maxValue(500)]));
    expect(control.status).toEqual('VALID');
  });

  it('should maxValue invalid', () => {
    const control = new FormControl('600', Validators.compose([CustomValidators.maxValue(500)]));
    expect(control.status).toEqual('INVALID');
  });

  it('should maxValue empty', () => {
    const control = new FormControl('', Validators.compose([CustomValidators.maxValue(500)]));
    expect(control.status).toEqual('VALID');
  });

  it('should maxValue not numeric', () => {
    const control = new FormControl('abc', Validators.compose([CustomValidators.maxValue(500)]));
    expect(control.status).toEqual('INVALID');
  });

  it('should maxLength', () => {
    const control = new FormControl('321654', Validators.compose([CustomValidators.maxlength(6)]));
    expect(control.status).toEqual('VALID');
  });

  it('should maxValue not numeric', () => {
    const control = new FormControl('321654', Validators.compose([CustomValidators.maxlength(5)]));
    expect(control.status).toEqual('INVALID');
  });

  it('should minLength', () => {
    const control = new FormControl('3254', Validators.compose([CustomValidators.minlength(6)]));
    expect(control.status).toEqual('INVALID');
  });

  it('should minLength', () => {
    const control = new FormControl('321654', Validators.compose([CustomValidators.minlength(5)]));
    expect(control.status).toEqual('VALID');
  });

  it('should alphanumber', () => {
    const control = new FormControl('123', Validators.compose([CustomValidators.alphanumber]));
    expect(control.status).toEqual('VALID');
  });

  it('should alphanumber', () => {
    const control = new FormControl('asd123', Validators.compose([CustomValidators.alphanumber]));
    expect(control.status).toEqual('VALID');
  });
});
