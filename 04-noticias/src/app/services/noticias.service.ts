import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'x-api-key': apiKey,
});
@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) {}

  getTopHeadlines = () =>
    this.ejecutarQuery<RespuestaTopHeadlines>(
      `/top-headlines?country=us&page=${++this.headLinesPage}`
    );
  // this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=86f825a9bb12458582d6a749d570f40f`);

  getTopHeadlinesByCategory = (categoria: string) => {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  };

  private ejecutarQuery = <T>(queryString: string) =>
    this.http.get<T>(` ${apiUrl}${queryString}`, { headers });
}
