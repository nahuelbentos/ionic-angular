import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  token: string = null;
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
  ) {
    this.init();
  }

  init = async () => await this.storage.create();

  login = (email: string, password: string) =>
    new Promise((resolve) => {
      this.http
        .post(`${URL}/user/login`, { email, password })
        .subscribe(async ({ ok, token }: any) => {
          if (ok) {
            await this.guardarToken(token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });

  register = (usuario: Usuario) =>
    new Promise((resolve, reject) => {
      this.http
        .post(`${URL}/user/create`, usuario)
        .subscribe(async ({ ok, token }: any) => {
          if (ok) {
            await this.guardarToken(token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });

  getUsuario = () => {
    // eslint-disable-next-line no-underscore-dangle
    if (!this.usuario._id) {
      this.validateToken();
    }
    return { ...this.usuario };
  };

  guardarToken = async (token: string) => {
    this.token = token;
    await this.storage.set('token', token);

    await this.validateToken();
  };

  cargarToken = async () =>
    (this.token = (await this.storage.get('token')) || null);

  validateToken = async (): Promise<boolean> => {
    await this.cargarToken();
    if (!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });
      this.http
        .get(`${URL}/user`, { headers })
        .subscribe(({ ok, usuario }: any) => {
          if (ok) {
            this.usuario = usuario;
            resolve(true);
          } else {
            this.navController.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  };

  updateUsuario = (usuario: Usuario) =>
    new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });
      this.http
        .post(`${URL}/user/update`, usuario, { headers })
        .subscribe(({ ok, token }: any) => {
          if (ok) {
            this.usuario = usuario;
            this.guardarToken(token);
            resolve(true);
          } else {
            this.navController.navigateRoot('/login');
            resolve(false);
          }
        });
    });

  logout = () => {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navController.navigateRoot('/login');
  };
}
