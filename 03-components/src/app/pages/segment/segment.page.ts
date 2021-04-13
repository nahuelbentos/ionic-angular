import {Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  superHeroes: Observable<any>;
  textSegment = ''

  constructor( private dataService: DataService) {}

  ngOnInit() {
    this.superHeroes = this.dataService.getHeroes().pipe( delay(1500) );
  }

  segmentChanged = ({detail}) => (detail.value === 'Todos') ?  this.textSegment = '' :  this.textSegment = detail.value;
}
