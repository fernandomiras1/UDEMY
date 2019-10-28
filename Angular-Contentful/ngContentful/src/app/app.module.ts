import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Component
import { CourseListComponent } from './course-list/course-list.component';
// Services
import { CourseDetailsComponent } from './course-details/course-details.component';
// pipe
import { MdToHtmlPipe } from './md-to-html.pipe';
import { MdToHtmlDirective } from './md-to-html.directive';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    CourseDetailsComponent,
    MdToHtmlPipe,
    MdToHtmlDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
