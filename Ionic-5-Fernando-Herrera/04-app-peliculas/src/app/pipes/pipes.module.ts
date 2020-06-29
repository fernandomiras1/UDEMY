import { FiltroImagenPipe } from './filtro-imagen';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';



@NgModule({
   declarations: [
      ImagenPipe,
      ParesPipe,
      FiltroImagenPipe
   ],
   imports: [
      CommonModule
   ],
   exports: [
      ImagenPipe,
      ParesPipe,
      FiltroImagenPipe
   ]
})
export class PipesModule { }
