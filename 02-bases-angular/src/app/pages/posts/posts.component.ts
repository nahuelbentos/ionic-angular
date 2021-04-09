import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  mensajes: any;

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
    this.mensajes = this.dataService.getPosts().pipe( tap( posts => console.log(posts)) );
  }

  clickHijo = ( e: Event) => console.log(e);



}
