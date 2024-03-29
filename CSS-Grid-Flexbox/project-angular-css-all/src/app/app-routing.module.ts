import { NeonLightBorderDivPageComponent } from './pages/neon-light-border-div-page/neon-light-border-div-page.component';
import { RichTextEditorPageComponent } from './pages/rich-text-editor-page/rich-text-editor-page.component';
import { WhatsappWebPageComponent } from './pages/whatsapp-web-page/whatsapp-web-page.component';
import { AnchorLinksPageComponent } from './pages/anchor-links-page/anchor-links-page.component';
import { InfinityCSSPageComponent } from './pages/infinity-css-page/infinity-css-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CircleProgressBarYappaComponent } from 'src/app/pages/circle-progress-bar-yappa-page/circle-progress-bar-yappa.component';
import { PrettyPrintJsonPageComponent } from './pages/pretty-print-json-page/pretty-print-json-page.component';
import { TransparentListHoverEffectsPageComponent } from './pages/transparent-list-hover-effects-page/transparent-list-hover-effects-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersPageComponent },
  { path: 'infinity-css', component: InfinityCSSPageComponent },
  { path: 'circle-progress-yappa', component: CircleProgressBarYappaComponent },
  { path: 'pretty-print-json', component: PrettyPrintJsonPageComponent },
  { path: 'anchor-links', component: AnchorLinksPageComponent },
  { path: 'whatsapp', component: WhatsappWebPageComponent },
  { path: 'rich-text-editor', component: RichTextEditorPageComponent },
  {
    path: 'transparent-list',
    component: TransparentListHoverEffectsPageComponent,
  },
  {
    path: 'neon-light-border',
    component: NeonLightBorderDivPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
