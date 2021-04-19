import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidesPrincipal', { static: false }) slides: IonSlides;

  loginUser = {
    email: 'nahuel@gmail.com',
    password: '123456',
  };
  registerUser: Usuario = {
    email: 'test@gmail.com',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(
    private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private navController: NavController
    ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = this.loginUser;
    const isOk = await this.usuarioService.login(email, password);
    if (isOk) {
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformacion(' Usuario/Contraseña no son correctos');
    }
  }

  async register(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const isOk = await this.usuarioService.register( this.registerUser  );
    if (isOk) {
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformacion(' Ese correo electronico ya existe');
    }
    console.log(form);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarIngresar() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
}
