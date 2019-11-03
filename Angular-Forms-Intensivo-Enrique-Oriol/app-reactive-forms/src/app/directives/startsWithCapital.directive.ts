import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';


export function startsWithCapitalValidator():ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if(!control.value){
            return null;
        } 
        const valid = /^[A-Z]/.test(control.value);
        return valid ? null : {'startsWithCapital':{value:control.value}};
    }
}

@Directive({
    selector: '[startsWithCapital]',
    providers: [{provide: NG_VALIDATORS, useExisting: StartsWithCapitalValidatorDirective, multi: true}]
})
export class StartsWithCapitalValidatorDirective implements Validator{
    @Input('startsWithCapital') isActive:boolean;

    validate(control:AbstractControl):(ValidationErrors | null){
        return !this.isActive ? null : startsWithCapitalValidator()(control);
    }
}