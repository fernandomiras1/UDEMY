import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.siguientes();

    // estar pendiente cada vex que se crea un nuvo post
    this.postsService.newPost.subscribe(post => {
      this.posts.unshift(post);
    });

  }

  recargar(event) {
    this.posts = [];
    this.habilitado = false;
    this.siguientes(event, true);
  }

  siguientes(event?, pull: boolean = false) {
    // si pull es true: traemos todos los registros de la pagina 1
    this.postsService.getPosts(pull).subscribe(resp => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) {
          this.habilitado = true;
        }
      }

    });

  }

}
