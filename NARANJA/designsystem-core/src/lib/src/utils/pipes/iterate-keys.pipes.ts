import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ZIterateKeys'
})
export class ZIterateKeys implements PipeTransform {
  transform(value): any {
    return value ? Object.keys(value) : null;
  }
}
