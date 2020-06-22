import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';



@NgModule({
   declarations: [
      ImagenPipe,
      ParesPipe
   ],
   imports: [
      CommonModule
   ],
   exports: [
      ImagenPipe,
      ParesPipe
   ]
})
export class PipesModule { }
