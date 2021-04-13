import {Component, OnInit, ViewChild} from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
})
export class InfinitePage implements OnInit {
  data: any[] = Array(20);

  @ViewChild( IonInfiniteScroll ) ionInfiniteScroll: IonInfiniteScroll;

  constructor() {}

  ngOnInit() {}

  loadData = (event) => {
    console.log(event);

    if( this.data.length > 87 ){
      this.ionInfiniteScroll.complete();
      this.ionInfiniteScroll.disabled = true;
      return;
    }

    setTimeout(() => {
      const array = Array(20)
      this.data.push( ...array );
      this.ionInfiniteScroll.complete()
      
    }, 1500);
  };
}
