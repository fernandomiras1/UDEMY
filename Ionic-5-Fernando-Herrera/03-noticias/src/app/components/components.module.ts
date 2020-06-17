import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    NoticiasComponent,
    NoticiaComponent
  ],
  exports: [
    NoticiasComponent
  ]
})
export class ComponentsModule { }
