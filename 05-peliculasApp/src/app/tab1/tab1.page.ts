import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService
      .getFeature()
      .subscribe(({ results }) => (this.peliculasRecientes = results));

    this.getPopulares();
  }

  cargarMas = () => this.getPopulares();

  getPopulares = () => this.moviesService.getPopulares().subscribe(({ results }) => (this.populares = [...this.populares, ...results]));
}
