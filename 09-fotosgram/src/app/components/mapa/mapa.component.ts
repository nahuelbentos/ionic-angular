import { Component, Input, OnInit, ViewChild } from '@angular/core';

declare const mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa', {static: true}) mapa;

  constructor() {}

  ngOnInit() {
    console.log(this.coords);

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken =
      'pk.eyJ1IjoibmJlbnRvcyIsImEiOiJja25renlhNWUwZHEyMm9sdHVxZXVvMnU0In0.OJKfQ__9Va3irWX1FjqsOA';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      center: [lng, lat],
      zoom: 15,
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }
}
