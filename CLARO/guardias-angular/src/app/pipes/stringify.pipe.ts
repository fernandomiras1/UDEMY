import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'stringify'
})

export class StringifyPipe implements PipeTransform{

    transform(object: any){
      return object = object == null ? JSON.stringify(object) : object;
    }

}