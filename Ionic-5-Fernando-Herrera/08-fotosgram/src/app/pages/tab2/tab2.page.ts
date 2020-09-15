import { Component, ViewChild } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AnyTxtRecord } from 'dns';

const { Geolocation, Camera } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  imgage: SafeResourceUrl;
  imaggg: any;
  tempImages: string[] = [];
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  @ViewChild('imageElement') imageElement: any;

  constructor(private postsService: PostsService,
    private domSanitizer: DomSanitizer,
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 75,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      correctOrientation: true
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    this.imaggg = image.webPath;
    console.log(imageUrl);
    // Can be set to the src of an image now
    // console.log(image.base64String);
    this.imgage = this.domSanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }

}
