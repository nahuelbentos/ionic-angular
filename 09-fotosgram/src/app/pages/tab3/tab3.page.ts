import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};
  avatarUsuario  = 'av-1.png';

  constructor(
    private usuarioService: UsuarioService,
    private postsService: PostsService,
    private uiService: UiServiceService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    console.log(this.usuario);

    this.avatarUsuario = this.usuario.avatar && this.usuario.avatar;
    console.log(this.avatarUsuario);

  }

  logout = () =>{

    this.postsService.paginaPosts = 0;

    this.usuarioService.logout();
  };

  async actualizar(form: NgForm){
    if( form.invalid ){ return; }

    const actualizado = await this.usuarioService.updateUsuario( this.usuario);
    if(actualizado){
      this.uiService.showToast('Se actualizo el usuario correctamente!');
    }else{
      this.uiService.showToast('Ocurrio un error al actualizar el usuario');

    }

  }

}
