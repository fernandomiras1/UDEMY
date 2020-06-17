import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../models/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {
  }

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    console.log(event);
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe(res => {
      if (res.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push( ...res.articles );
      if (event) {
        event.target.complete();
      }
    });
  }

}
