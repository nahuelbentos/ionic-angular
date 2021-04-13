import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {

  fechaNacimiento: Date = new Date();
  customYearValues = [2025, 2020, 2016, 2008, 2004, 2000, 1996];
  customPickerOptions: any = {
    buttons: [
      {
        text: 'Hola',
        handler: (event) => console.log(event)
      },
      {
        text: 'Mundo'
      },
    ]
  }

  constructor() { }

  ngOnInit() {
  }

  cambioFecha = ( event: CustomEvent ) => {
    console.log( event );
    console.log( new Date(event.detail.value) );
  }
  

}
