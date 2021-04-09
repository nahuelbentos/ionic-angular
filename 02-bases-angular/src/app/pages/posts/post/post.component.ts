import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() mensaje: any;

  @Output() clickPost = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick = () => this.clickPost.emit( this.mensaje.id );


}
