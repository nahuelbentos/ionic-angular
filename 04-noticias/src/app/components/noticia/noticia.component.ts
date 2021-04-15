import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() numerador: number;

  @Input() enFavoritos = false;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    public actionSheetController: ActionSheetController,
    private dataLocalService: DataLocalService,
    private platform: Platform
  ) {}

  ngOnInit() {  }

  abrirNoticia = () => {
    const browser = this.iab.create(this.noticia.url, '_system');
  };

  lanzarMenu = async () => {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir ',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => this.compartirNoticia(),
        },
        {
          text: ( this.enFavoritos )  ? 'Borrar Favorito': 'Favorito' ,
          icon:  ( this.enFavoritos )  ? 'trash-outline':  'heart',
          cssClass: 'action-dark',
          handler: () => ( this.enFavoritos )
             ? this.dataLocalService.borrarNoticia(this.noticia)
             : this.dataLocalService.guardarNoticia(this.noticia)
          ,
        },
        {
          text: 'Cancel',
          icon: 'close',
          cssClass: 'action-dark',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role = '' } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  };


  compartirNoticia = () => {

    if ( this.platform.is('cordova') ) {
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );
      console.log('Share clicked');

    }else {
      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.source.name,
          url: this.noticia.url
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log(' El navegador no soporta el compartir');
      }
    }


  };
}
