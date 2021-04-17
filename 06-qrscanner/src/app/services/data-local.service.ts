import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

import { Storage } from '@ionic/storage-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer,
    ) {
    this.storage.create();
    this.cargarStorage();
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);

    console.log(this.guardados);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro( nuevoRegistro );
  }

  async cargarStorage() {
    this.guardados = (await this.storage.get('registros')) || [];
  }



  abrirRegistro( registro: Registro ) {

    this.navCtrl.navigateForward('/tabs/tab2');

    switch ( registro.type ) {

      case 'http':
        this.inAppBrowser.create( registro.text, '_system' );
      break;

      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${ registro.text }`);
      break;

    }


  }



  enviarCorreo = () => {

    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push( titulos );

    this.guardados.forEach( ({type, format, created, text}) =>
      arrTemp.push( `${ type }, ${ format }, ${ created }, ${ text.replace(',', ' ') }\n` ));

      console.log( arrTemp.join(' ') );


    this.crearArchivoFisico( arrTemp.join('') );

  };

  crearArchivoFisico = ( text: string ) => {


    this.file.checkFile( this.file.dataDirectory, 'registros.csv' )
      .then( existe => {
        console.log('Existe archivo?', existe );
        return this.escribirEnArchivo( text );
      })
      .catch( err => this.file.createFile( this.file.dataDirectory, 'registros.csv', false )
                .then( creado => this.escribirEnArchivo( text ) )
                .catch( err2 => console.log( 'No se pudo crear el archivo', err2 ))

      );

  };

  escribirEnArchivo = async ( text: string ) => {

    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text);
    console.log('archivo creado');
    console.log(this.file.dataDirectory + '/registros.csv');


    const email = {
      to: 'nahuelbentosgnocchi@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        `${this.file.dataDirectory}registros.csv`
      ],
      subject: 'Backup de scans',
      body: 'Adjunto se encuentra los backups de los scans - <strong>ScanApp</strong> ',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);



  };

}
