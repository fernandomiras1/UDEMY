import { TitlecaseAll } from './titlecase-all.pipe';
import { StringifyPipe } from './stringify.pipe';
import { ShortDayToSpanish } from './shortdaytospanish.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { RemoveSpacePipe } from './removespace.pipe';
import { DayNamePipe } from './day-name.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { SortByPipe } from './sort-by.pipe';
import { UppercasePipe } from './uppercase.pipe';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [
      DayNamePipe,
      RemoveSpacePipe,
      SafeUrlPipe,
      ShortDayToSpanish,
      StringifyPipe,
      TitlecaseAll,
      TruncatePipe,
      SortByPipe,
      UppercasePipe
   ],
   exports: [
      DayNamePipe,
      RemoveSpacePipe,
      SafeUrlPipe,
      ShortDayToSpanish,
      StringifyPipe,
      TitlecaseAll,
      TruncatePipe,
      SortByPipe
   ]
})
export class PipesModule { }
