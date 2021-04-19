import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform = ( img: string, userId: string): string =>  `${ URL }/posts/imagen/${ userId }/${ img }`;

}
