import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RespuestaMDB,
  PeliculaDetalle,
  RespuestaCredits,
  RespuestaSearch,
  Genre,
} from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  generos: Genre[] = [];
  private popularesPage = 0;

  constructor(private http: HttpClient) {}

  getFeature = () => {
    const hoy = new Date();
    const ultimoDia = new Date(
      hoy.getFullYear(),
      hoy.getMonth() + 1,
      0
    ).getDate();
    const mes = hoy.getMonth() + 1;

    const mesString = mes < 10 ? '0' + mes : mes;
    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.executeQuery<RespuestaMDB>(
      `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
    );
  };

  getPopulares = () =>
    this.executeQuery<RespuestaMDB>(
      `/discover/movie?sort_by-popularity.desc&page=${++this.popularesPage}`
    );

  getPeliculaDetalle = (id: string) =>
    this.executeQuery<PeliculaDetalle>(`/movie/${id}?a=1`);

  buscarPelicula = (texto: string) =>
    this.executeQuery<RespuestaSearch>(`/search/movie?query=${texto}`);

  getPeliculaActores = (id: string) =>
    this.executeQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);

  cargarGeneros = (): Promise<Genre[]> =>
    new Promise((resolve) =>
      this.executeQuery(`/genre/movie/list?a=1`).subscribe(({ genres }) => {
        console.log(genres);
        this.generos = genres;
        resolve(this.generos);
      })
    );

  private executeQuery = <T>(query: string) => {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);
  };
}
