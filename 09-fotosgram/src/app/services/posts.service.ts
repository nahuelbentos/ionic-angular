import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  paginaPosts = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer
  ) {}

  getPosts = (pull: boolean = false) =>
    this.http.get<RespuestaPosts>(
      `${URL}/posts?pagina=${
        pull ? (this.paginaPosts = 1) : ++this.paginaPosts
      }`
    );

  createPost = (newPost) =>
    new Promise((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token,
      });

      this.http
        .post(`${URL}/posts`, newPost, { headers })
        .subscribe(({ ok, post }: any) => {
          this.nuevoPost.emit(post);
          resolve(true);
        });
    });

  subirImagen = (img: string) => {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token,
      },
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}/posts/upload`, options)
      .then((data) => console.log(data))
      .catch((err) => console.log('Error en carga de imagen', err));
  };
}
