import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'upperCapital'
})
export class UpperCapitalPipe implements PipeTransform {
    transform(value: string) {
      //  la primera letra en mayuscula y todas las demas en minuscula
        return value[0].toUpperCase() + value.substring(1).toLowerCase();
    }
}
