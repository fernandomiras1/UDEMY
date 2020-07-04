import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: string, mostrar: boolean = true ): string {
    // Algo nuevo del E6 va a repetir el * por el length del value. MUY PRO
    return ( mostrar ) ? '*'.repeat( value.length ) : value;
  }

}
