import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  disabled = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.siguientes();

    this.postsService.nuevoPost.subscribe( post => this.posts.unshift(post));
  }

  recargar = (event) => {

    this.disabled = false;
    this.posts = [];
    this.siguientes( event , true);
  };


  siguientes = (event?, pull: boolean = false)=> {
    if( pull ){
      this.disabled = false;
      this.posts = [];
    }
    console.log(event);
    this.postsService.getPosts( pull ).subscribe( ({ posts }) =>{
       this.posts.push( ...posts);
        if(event){
          event.target.complete();

          if(posts.length === 0){
            this.disabled = true;
          }
        }

      });
  };

}
