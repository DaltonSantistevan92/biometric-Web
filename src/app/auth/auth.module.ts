import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MaterialsModule } from '../materials/materials.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  exports : [
    LoginComponent
  ],

  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MaterialsModule
  ]
})
export class AuthModule { }
