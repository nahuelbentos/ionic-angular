import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroImagen'
})
export class FiltroImagenPipe implements PipeTransform {

  transform = (peliculas: PeliculaDetalle[]): PeliculaDetalle[]  => peliculas.filter( p => p.backdrop_path );

}
