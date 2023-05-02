import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from '@pages/pages-routing.module';

import { PagesComponent } from '@pages/pages.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GestionUsuarioComponent } from '@pages/gestion-usuario/gestion-usuario.component';
import { CrearEditarUsuarioComponent } from '@pages/gestion-usuario/crear-editar-usuario/crear-editar-usuario.component';


import { SharedModule } from '@shared/shared.module';
import { MaterialsModule } from '@materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DialodDeleteModule } from '@app/dialod-delete/dialod-delete.module';

import { CedulaDirective } from '@directives/cedula.directive';
import { NumericOnlyDirectiveDirective } from '@directives/numeric-only-directive.directive';
import { AlphaNumericDirective } from '@directives/alpha-numeric.directive';
import { EmailValidationDirective } from '@directives/email-validation.directive';
import { LettersDirective } from '@directives/letters.directive';
import { NumerosEcuadorPhoneDirective } from '@directives/numeros-ecuador-phone.directive';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    GestionUsuarioComponent,
    CrearEditarUsuarioComponent,
    NumericOnlyDirectiveDirective,
    CedulaDirective,
    AlphaNumericDirective,
    EmailValidationDirective,
    LettersDirective,
    NumerosEcuadorPhoneDirective
  ],
  exports : [
    CommonModule,
    EmailValidationDirective
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    DialodDeleteModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
