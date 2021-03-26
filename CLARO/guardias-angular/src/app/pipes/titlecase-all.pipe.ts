import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecaseAll'
})
export class TitlecaseAll implements PipeTransform {

  transform(value: string): string {
    if(value) {
      return value.toLocaleLowerCase()
        .trim()
        .split(" ")
        .map(item => {
          return item.charAt(0).toUpperCase() + item.slice(1);
        })
        .join(" ");
    }
  }

}
