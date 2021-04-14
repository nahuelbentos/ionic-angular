import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.cargarFavoritos();
  }

  guardarNoticia = async (noticia: Article) => {
    this.storage.create();
    const existe = this.noticias.find( (notice) => notice.title === noticia.title );
    if (!existe) {
      // this.storage.create();
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      await this.presentToast('Noticia guardada en favoritos!');
    }
  };

  borrarNoticia = async ({ title }: Article) => {
    this.storage.create();
    this.noticias = this.noticias.filter((noticia) => noticia.title !== title);
    this.storage.set('favoritos', this.noticias);
    await this.presentToast('Noticia borrada de favoritos!');
  };

  cargarFavoritos = async () => {
    this.storage.create();

    return (
      (await this.storage.get('favoritos')) &&
      (this.noticias = await this.storage.get('favoritos'))
    );
  };

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
