import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dayName'
})
export class DayNamePipe implements PipeTransform {

  transform(day: any, short = false): string {

    let date = this.getDate(day);

    let dayName = moment(date, "D_M_YYYY")
      .locale("es")
      .format("dddd")
      .toLowerCase();
  
    if (short) {
      return this.shortFormat(dayName);
    }
  
    return dayName;
  }

  getDate(day: any): Date {
    if (typeof day === "string") {
      if (day.trim().split(" ").length === 1) {
        return new Date(day + " 00:00:01");
      }
  
      return new Date(day);
    }
  
    return day;
  }
  
  shortFormat(dayName: string): string {
    const days = {
      lunes: "lun",
      martes: "mar",
      miércoles: "mié",
      jueves: "jue",
      viernes: "vie",
      sábado: "sáb",
      domingo: "dom"
    };
    return days[dayName] ? days[dayName] : "invalid day";
  }



}
