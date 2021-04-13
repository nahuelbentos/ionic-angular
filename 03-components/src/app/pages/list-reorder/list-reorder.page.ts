import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reorder',
  templateUrl: './list-reorder.page.html',
  styleUrls: ['./list-reorder.page.scss'],
})
export class ListReorderPage implements OnInit {

  personajes: string[] = ['Aquaman', 'Superman',  'Batman', 'Wonderwoman', 'Flash'];
  isDisabled = false;

  constructor() { }

  ngOnInit() {
  }

  doReorder = (event) => {
    console.log(event);

    console.log(this.personajes);
    const item = this.personajes.splice( event.detail.from, 1 )[0];
    this.personajes.splice( event.detail.to, 0, item);

    console.log(this.personajes);
    event.detail.complete();
  }
  

}
