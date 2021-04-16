import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

interface PeliculasPorGenero {
  genero: Genre;
  peliculas: PeliculaDetalle[];
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritosPorGenero: PeliculasPorGenero[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private moviesService: MoviesService
  ) {}

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocalService.cargarFavoritos();

    this.generos = await this.moviesService.cargarGeneros();

    this.favoritosPorGenero = this.peliculasPorGenero(
      this.generos,
      this.peliculas
    );
    console.log(' result: ', this.favoritosPorGenero);
  }

  peliculasPorGenero = (generos: Genre[], peliculas: PeliculaDetalle[]) =>
    generos.map((genero) => ({
      genero,
      peliculas: peliculas.filter((p) =>
        p.genres.find((g) => g.id === genero.id)
      ),
    })) || [];
}
