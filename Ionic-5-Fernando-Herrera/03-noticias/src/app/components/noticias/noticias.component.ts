import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../models/interface';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;

  constructor() { }

  ngOnInit() {}

}
