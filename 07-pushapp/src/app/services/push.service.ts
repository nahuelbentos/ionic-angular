import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  mensajes: OSNotificationPayload[] = [];
  pushListener = new EventEmitter<OSNotificationPayload>();
  userId: string;

  constructor(private oneSignal: OneSignal, private storage: Storage) {
    this.storage.create();
    this.cargarMensajes();
  }

  getMensajes = async () => {
    await this.cargarMensajes();
    return [...this.mensajes];
  };

  configuracionInicial = async () => {
    this.oneSignal.startInit( 'abb05aed-46fc-4777-87e6-c2d126cb7832', '873316681899');

    this.oneSignal.inFocusDisplaying( this.oneSignal.OSInFocusDisplayOption.Notification );

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log(' Notificación recibida ', noti);
      this.notificacionRecibida( noti );
    });

    this.oneSignal.handleNotificationOpened().subscribe( async (noti) => {
      // do something when a notification is opened
      console.log(' Notificación abierta ', noti);
      await this.notificacionRecibida( noti.notification );
    });


    this.oneSignal.getIds().then( ({ userId }) =>{
       this.userId = userId;
       console.log(this.userId);

      } );

    this.oneSignal.endInit();
  };

  notificacionRecibida = async (notification: OSNotification) => {

    await this.cargarMensajes();

    const { payload } = notification;

    const existePush = this.mensajes.find( (mensaje) => mensaje.notificationID === payload.notificationID );

    if (existePush) {
      return;
    }

    this.mensajes.unshift(payload);
    this.pushListener.emit( payload );

    await this.guardarMensajes();
  };

  guardarMensajes = () => this.storage.set('mensajes', this.mensajes);


  cargarMensajes = async () => {
    this.mensajes = await this.storage.get('mensajes') || [];
    return this.mensajes;
  };

  borrarMensajes = async () => {
    await this.storage.clear();
    this.mensajes = [];
    this.guardarMensajes();
  };

}
