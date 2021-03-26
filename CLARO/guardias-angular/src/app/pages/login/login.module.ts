import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { MaterialModule } from '@app/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule { }