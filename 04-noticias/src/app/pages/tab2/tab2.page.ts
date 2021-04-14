import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;

  categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  noticias: Article[] = [];
  isDisabled = false;

  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit() {
    this.loadNoticiasByCategory(this.categorias[0]);
  }

  loadData = ({ target }) =>
    this.loadNoticiasByCategory(this.segment.value, target);

  segmentChanged = ({ detail }: any) => {
    this.noticias = [];
    this.loadNoticiasByCategory(detail.value);
  };

  loadNoticiasByCategory = (categoria: string, target?) =>
    this.noticiasServices
      .getTopHeadlinesByCategory(categoria)
      .subscribe(({ articles, totalResults }) => {
        this.noticias.push(...articles);

        if (target) {
          target.complete();
        }

        if (this.noticias.length >= totalResults) {
          this.isDisabled = true;
        }
      });
}
