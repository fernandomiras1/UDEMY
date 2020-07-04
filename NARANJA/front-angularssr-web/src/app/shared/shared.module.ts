import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZumoModule } from 'zumo';
import { TranslateModule } from '@ngx-translate/core';
import { LazysizesDirective } from './directives/lazysizes/lazysizes.directive';
import { LazysizespictureDirective } from './directives/lazysizespicture/lazysizespicture.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ZumoModule,
  ],
  exports: [
    TranslateModule,
    ZumoModule,
    LazysizesDirective,
    LazysizespictureDirective,
  ],
  declarations: [
    LazysizesDirective,
    LazysizespictureDirective,
  ],
})
export class SharedModule { }
