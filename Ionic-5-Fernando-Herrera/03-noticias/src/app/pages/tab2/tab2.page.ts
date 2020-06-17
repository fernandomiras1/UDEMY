import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../models/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categorias = ['business','entertainment','general','health','science','sports','technology'];
  noticias: Article[] = [];
  segmentValue = 'business';
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias('business');
  }

  cambioCategoria(event: CustomEvent) {
    this.noticias = [];
    this.segmentValue = event.detail.value;
    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesByCategory(categoria)
      .subscribe(resp => {
        this.noticias.push( ...resp.articles );
        if (event) {
          event.target.complete();
        }
      });
  }

  loadData(event) {
    this.cargarNoticias(this.segmentValue, event)
  }

}
