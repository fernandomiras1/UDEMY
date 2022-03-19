import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transparent-list-hover-effects-page',
  templateUrl: './transparent-list-hover-effects-page.component.html',
  styleUrls: ['./transparent-list-hover-effects-page.component.scss'],
})
export class TransparentListHoverEffectsPageComponent implements OnInit {
  constructor() {}

  readonly list = [
    {
      name: 'Fernando Miras',
      job: 'Software Developer',
    },
    {
      name: 'Fede Miras',
      job: 'Industrial Designer',
    },
    {
      name: 'Brunejo',
      job: 'Software Developer',
    },
    {
      name: 'Martin',
      job: 'Devops Developer',
    },
  ];

  ngOnInit() {}
}
