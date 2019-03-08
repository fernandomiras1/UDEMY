import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // replaces previous Http service
import { AppMaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing.module';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth/auth.service';
import { PmsService } from './services/entities/pms.service';
import { CustomHttpInterceptor } from './services/common/http-interceptor';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchComponent } from './components/novelties/search/search.component';
import { ApplicationService, DEFAULT_FORMATS } from './services/application/application.service';
import { FileService } from './services/common/file.service';
import { ClientService } from './services/entities/client.service';
import { EmployeeService } from './services/entities/employee.service';
import { ProjectsService } from './services/entities/projects.service';
import { ManagersService } from './services/entities/managers.service';
import { DetailsComponent } from './components/novelties/details/details.component';
import { IndexComponent } from './components/novelties/index/index.component';
import { RecategorizationComponent } from './components/novelties/partial/recategorization/recategorization.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NoveltiesService, NoveltyUIService } from './services/novelties/novelties.service';
import { ProgressBarService } from './services/application/progress-bar.service';
import { PromptDialogComponent } from './components/ui/prompt-dialog/prompt-dialog.component';
import { ButtonService } from './services/ui/buttons.service';
import { CruisingSalarySearchComponent } from './components/cruisingSalary/cruising-salary-search/cruising-salary-search.component';
import { CruisingSalaryIndexComponent } from './components/cruisingSalary/cruising-salary-index/cruising-salary-index.component';
import { CruisingSalaryService } from './services/cruising-salary/cruising-salary.service';
import { MessageDialogComponent } from './components/ui/message-dialog/message-dialog.component';
import { LiquidateIndexComponent } from './components/liquidate/liquidate-index/liquidate-index.component';
import { LiquidateSearchComponent } from './components/liquidate/liquidate-search/liquidate-search.component';
import { CruisingSalaryDialogComponent } from './components/ui/cruising-salary-dialog/cruising-salary-dialog.component';
import { ValidationsHelperService } from './services/common/validationsHelper.service';
import { GridService } from 'src/app/services/ui/grid.service';
import { FileUploadDialogComponent } from './components/ui/file-upload-dialog/file-upload-dialog.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SalaryToPayService } from './services/salary-to-pay/salary-to-pay.service';
import { GuardsComponent } from './components/novelties/partial/guards/guards.component';
import { ExtraHourComponent } from './components/novelties/partial/extra-hour/extra-hour.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    DetailsComponent,
    IndexComponent,
    RecategorizationComponent,
    PromptDialogComponent,
    MessageDialogComponent,
    CruisingSalaryDialogComponent,
    CruisingSalarySearchComponent,
    CruisingSalaryIndexComponent,
    LiquidateIndexComponent,
    LiquidateSearchComponent,
    FileUploadDialogComponent,
    GuardsComponent,
    ExtraHourComponent
  ],
  entryComponents: [PromptDialogComponent, MessageDialogComponent, CruisingSalaryDialogComponent, FileUploadDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FileUploadModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: DEFAULT_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {provide: LOCALE_ID, useValue: 'en-US' },
    PmsService,
    ClientService,
    EmployeeService,
    ProjectsService,
    ManagersService,
    ApplicationService,
    NoveltiesService,
    ProgressBarService,
    FileService,
    ButtonService,
    CruisingSalaryService,
    ValidationsHelperService,
    GridService,
    NoveltyUIService,
    SalaryToPayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
