import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { CountriesComponent } from './containers/countries/countries.component';
import { CountriesService } from './services/countries.service';
import { CountriesEffects } from './store/countries.effects';
import * as fromCountriesReducer from './store/countries.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('countries', fromCountriesReducer.reducer),
    EffectsModule.forFeature([CountriesEffects]),
    RouterModule.forChild([
      {
        path: 'countries',
        component: CountriesComponent,
      },
    ]),
    SharedModule,
  ],
  declarations: [
    CountriesComponent,
  ],
  entryComponents: [
    CountriesComponent,
  ],
  exports: [CountriesComponent],
  providers: [CountriesService],
})
export class CountriesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CountriesModule,
    };
  }
}
