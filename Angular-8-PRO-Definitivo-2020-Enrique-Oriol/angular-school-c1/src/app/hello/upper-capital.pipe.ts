import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'upperCapital'
})

// devovlemos la primera en Mayuscula y todo lo demas en minuscula
export class UpperCapitalPipe implements PipeTransform {
  transform(value: string) {
    return value[0].toUpperCase() + value.substring(1).toLowerCase();
  }
}
