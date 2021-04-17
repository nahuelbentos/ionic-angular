import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(public dataLocal: DataLocalService) {}

  enviarCorreo = () => this.dataLocal.enviarCorreo();

  abrirRegistro = (registro: Registro) => {
    console.log('abrir Registro');
    this.dataLocal.abrirRegistro( registro );
  };
}
