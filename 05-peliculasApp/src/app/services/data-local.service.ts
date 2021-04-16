import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.storage.create();
    this.cargarFavoritos();
  }

  guardarPelicula = (pelicula: PeliculaDetalle) => {
    const existe = this.peliculas.find((p) => p.id === pelicula.id);

    if (existe) {
      this.peliculas = this.peliculas.filter((p) => p.id !== pelicula.id);
      this.presentToast('Removido de favoritos');
    } else {
      this.peliculas.push(pelicula);
      this.presentToast('Agregada a favoritos');
    }

    return this.storage.set('peliculas', this.peliculas);
  };

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  cargarFavoritos = async () =>
    (this.peliculas = (await this.storage.get('peliculas')) || []);

  existePelicula = (id: number) =>
    this.cargarFavoritos().then(() =>
      this.peliculas.find((p) => p.id === id) ? true : false
    );

  // existePelicula = async (id: number) => {
  //   await this.cargarFavoritos();
  //   return this.peliculas.find((p) => p.id === id) ? true : false;
  // };
}
