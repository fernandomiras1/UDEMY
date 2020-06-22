import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  URL = environment.imgPath;
  transform(img: string, size: string = 'w500'): string {

    if (!img) {
      return '../../assets/no-image-banner.jpg';
    }

    const imgUrl = `${this.URL}/${size}${img}`;
    console.log(imgUrl);
    return imgUrl;
  }

}
