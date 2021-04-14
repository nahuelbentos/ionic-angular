import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] =[];
  isDisabled = false;

  constructor( private noticiasServices: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData = ( {target} ) => this.cargarNoticias(target);


  cargarNoticias = ( target? ) => this.noticiasServices.getTopHeadlines().subscribe( ({ articles, totalResults }) => {
    this.noticias.push( ...articles ) ;

    if( target ){
      target.complete();
    }

    if( this.noticias.length >= totalResults  ){
      this.isDisabled = true;
    }

  });


}
