import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'removespace'
})

export class RemoveSpacePipe implements PipeTransform{

    transform(value: any){
      return value.replace(/\s/g, '');
    }

}