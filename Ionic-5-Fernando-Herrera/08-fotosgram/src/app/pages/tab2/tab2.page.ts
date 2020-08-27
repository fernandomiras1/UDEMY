import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(private postsService: PostsService,
              private route: Router) {}


  async crearPost() {
    console.log(this.post);
    await this.postsService.crearPost(this.post);
    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if ( !this.post.posicion ) {
      this.post.coords = null;
      return;
    }
    this.cargandoGeo = true;

    this.getCurrentPosition().then(resp => {
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
    });

  }

  getCurrentPosition() {
    return Geolocation.getCurrentPosition();
  }

}
