import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../models/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  getPosts(pull: boolean = false) {

    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }


  crearPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {
      this.http.post(`${ URL }/posts`, post, { headers })
        .subscribe( (resp: {ok: boolean, post: Post}) => {
          // emitir cada vex que hago un nuevo post.
          this.newPost.emit(resp.post);
          resolve(true);
        });
    });

  }
  
  uploadImage(img: string) {
    console.log(img);
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    const formData = new FormData();
    formData.append('files', img);
    formData.append('fileKey', 'image');
 
    return this.http.post(`${URL}/posts/upload`, formData, { headers });
  }
}
