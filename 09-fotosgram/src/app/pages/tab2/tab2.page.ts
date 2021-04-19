import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

declare const window: any;

const initialPost = {
  mensaje: '',
  coords: null,
  posicion: false,
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];
  post = initialPost;
  cargandoGeo = false;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private geolocation: Geolocation,
    private camera: Camera,
    private imagePicker: ImagePicker
  ) {}

  async crearPost() {
    console.log(this.post);
    const created = await this.postsService.createPost(this.post);
    if (created) {
      this.post = initialPost;
      this.tempImages = [];
      this.router.navigateByUrl('/main/tabs/tab1');
    }
  }

  getGeo() {
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeo = true;
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.cargandoGeo = false;

        // resp.coords.latitude
        // resp.coords.longitude
        const { latitude, longitude } = resp.coords;
        this.post.coords = `${latitude},${longitude}`;
        console.log(this.post.coords);
      })
      .catch((error) => {
        console.log('Error getting location', error);
        this.cargandoGeo = false;
      });
  }

  camara = () => {
    console.log(' Abrir camara ');

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.procesarImagen(options);
  };

  galeria = () => {
    console.log(' Abrir galeria ');

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };

    this.procesarImagen(options);
  };

  procesarImagen(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.postsService.subirImagen( imageData );
        this.tempImages.push(img);

        // const base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        // Handle error
      }
    );
  }

  picker = () => {
    this.hasReadPermission();
    this.imagePicker.getPictures({ quality: 60 }).then( (results) => {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);

        this.tempImages.push( results[i] );
        }
      },
      (err) => {}
    );
  };

  hasReadPermission() {
    window.imagePicker.hasReadPermission( (result: any) => {
        // if this is 'false' you probably want to call 'requestReadPermission' now
        console.log(result);
      }
    );
  }

  requestReadPermission() {
    // no callbacks required as this opens a popup which returns async
    window.imagePicker.requestReadPermission();
  }
}
