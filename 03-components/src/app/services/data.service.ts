import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Componente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient ) { }

  getUsuarios = () => this.http.get('https://jsonplaceholder.typicode.com/users');

  getAlbums = () => this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');

  getMenuOpts = () => this.http.get<Componente[]>('/assets/data/menu-opts.json');
  getHeroes = () => this.http.get<Componente[]>('/assets/data/superheroes.json');
}
