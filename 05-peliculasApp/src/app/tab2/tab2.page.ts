import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar: string;

  peliculas: Pelicula[] = [];

  buscando = false;

  ideas: string[] = ['Spiderman', 'Superman', 'Batman', 'Avengers', 'El señor de los anillos'];

  constructor(
    private moviesService: MoviesService,
    private modalController: ModalController
    ) {}


  buscar = ( {detail}: any ) => {
    this.buscando = true;

    if (detail.value.length === 0 ) {
      this.peliculas = [];
      return this.buscando = false;
    }

    this.moviesService.buscarPelicula( detail.value ).subscribe( ({results}) => {
      this.buscando = false;
      this.peliculas = results;
    });
  };


  verDetalle = async ( id ) => {
    const modal = await this.modalController.create({ component: DetalleComponent, componentProps: { id }  });
    modal.present();
  };


}
