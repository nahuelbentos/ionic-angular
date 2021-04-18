import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PushService } from '../services/push.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mensajes: OSNotificationPayload[] = [];

  constructor(
    public pushService: PushService,
    private applicationRef: ApplicationRef
    ) {}

  ngOnInit(): void {
    this.pushService.pushListener.subscribe( notification => {
      console.log('home: ', notification);

      this.mensajes.unshift(notification);
      console.log('tick: ');
      this.applicationRef.tick();
    });
  }

  async ionViewWillEnter(){
    console.log(' WillEnter - Cargar Mensajes');

    this.mensajes = await this.pushService.getMensajes();
    console.log(' mensajes: ', this.mensajes);
  }

  borrarMensajes = async () =>{
    await this.pushService.borrarMensajes();
    this.mensajes = [];
  };

}
