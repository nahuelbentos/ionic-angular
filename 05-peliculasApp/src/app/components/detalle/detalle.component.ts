import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[];
  existe: boolean;

  sliderOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(
    private moviesService: MoviesService,
    private dataLocalService: DataLocalService,
    private modalController: ModalController

    ) {}

  async ngOnInit() {
    this.existe = await this.dataLocalService.existePelicula( this.id );

    this.moviesService.getPeliculaDetalle( this.id ).subscribe(detalle =>  this.pelicula = detalle );

    this.moviesService.getPeliculaActores( this.id ).subscribe( ({ cast })  => this.actores = cast );

  }

  regresar = () => this.modalController.dismiss();

  favorito = () => this.dataLocalService.guardarPelicula( this.pelicula ).then( () => this.existe = !this.existe );

}
