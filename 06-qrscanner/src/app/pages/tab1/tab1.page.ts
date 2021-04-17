import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(
    private barcodeScanner: BarcodeScanner,
    private dataLocalService: DataLocalService
    ) {}

  ionViewDidEnter() {
    //console.log('viewDidEnter');
  }

  ionViewDidLeave() {
    //console.log('viewDidLeave');
  }

  ionViewWillEnter() {
    this.scan();
  }

  ionViewWillLeave() {
    //console.log('viewWillLeave');
  }

  scan() {
    this.barcodeScanner.scan().then( ({ cancelled, format, text }) => {
      if(!cancelled){
        this.dataLocalService.guardarRegistro( format, text );
      }
      console.log('Barcode data', { cancelled, format, text });
     }).catch(err => {
         console.log('Error', err);
        //  this.dataLocalService.guardarRegistro( 'QRCode', 'https://fernando-herrera.com' );
         this.dataLocalService.guardarRegistro( 'QRCode', 'geo:-34.904218099176745,-56.17317810496219' );
     });
  }
}
