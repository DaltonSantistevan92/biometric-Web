import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MaterialsModule } from '../materials/materials.module';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavComponent,
    BreadcrumbComponent,
    PerfilComponent
  ],
  exports : [
    SidebarComponent,
    NavComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialsModule
  ]
})
export class SharedModule { }
