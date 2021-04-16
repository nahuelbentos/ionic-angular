import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input()  peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spacesBetween: -10
  };

  constructor( private modalController: ModalController) { }

  ngOnInit() {}

  verDetalle = async ( id ) => {
    const modal = await this.modalController.create({ component: DetalleComponent, componentProps: { id }  });
    modal.present();
  };

  onClick = ()  => this.cargarMas.emit();


}
