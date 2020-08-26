import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    PostsComponent,
    PostComponent,
    AvatarSelectorComponent
  ],
  exports: [
    PostsComponent,
    AvatarSelectorComponent
  ]
})
export class ComponentsModule { }
