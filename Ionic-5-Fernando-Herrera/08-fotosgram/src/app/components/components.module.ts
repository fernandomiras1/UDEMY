import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    PostsComponent,
    PostComponent
  ],
  exports: [
    PostsComponent,
  ]
})
export class ComponentsModule { }
