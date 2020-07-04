import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public data;
  constructor(
    private title: Title,
    private meta: Meta,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.title.setTitle('About / Angular SSR');
    this.meta.updateTag({
      description: 'Welcome to about section',
    });
  }
}
