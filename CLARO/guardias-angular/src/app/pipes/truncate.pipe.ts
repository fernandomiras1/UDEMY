import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(str: string, limit = 10): string {

    if(str.length > limit) {
      str = str.substring(0,limit) + '...';
    }

    return str;
  }

}
