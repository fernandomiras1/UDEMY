import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortdaytospanish'
})
export class ShortDayToSpanish implements PipeTransform {

  transform(value: string): string {
    if (value) {

      let result = value;
      const shortDayName = value.toLocaleLowerCase().trim().match(/(\w{3})\s.+/);

      const shortDays = {
        mon: 'Lunes',
        tue: 'Martes',
        wed: 'Miércoles',
        thu: 'Jueves',
        fri: 'Viernes',
        sat: 'Sábado',
        sun: 'Domingo',
      };
      if (shortDayName[1] && shortDays[shortDayName[1]]) {
        result = shortDays[shortDayName[1]] + result.slice(3);
      }

      return result;
    }
  }

}
