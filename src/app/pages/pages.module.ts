import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PruebaComponent } from './prueba/prueba.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';
import { MaterialsModule } from '../materials/materials.module';
import { CrearEditarUsuarioComponent } from './gestion-usuario/crear-editar-usuario/crear-editar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PruebaComponent,
    GestionUsuarioComponent,
    CrearEditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
