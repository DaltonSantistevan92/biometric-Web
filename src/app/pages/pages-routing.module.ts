import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from '@pages/pages.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { GestionUsuarioComponent } from '@pages/gestion-usuario/gestion-usuario.component';

import { AuthGuard } from '@auth/guards/auth.guard';
import { GestionEventoComponent } from './gestion-evento/gestion-evento.component';
import { GestionDepartamentoComponent } from './gestion-departamento/gestion-departamento.component';

const routes: Routes = [
  { path : '' , redirectTo : 'inicio/dashboard', pathMatch : 'full'},
  { 
    path : '', 
    component : PagesComponent,//home pagina principal
    canActivate : [AuthGuard],
    children : [
      { 
        path : 'inicio/dashboard', 
        component : DashboardComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'gestión-usuario/nuevo-usuario', 
        component : GestionUsuarioComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'registro/evento', 
        component : GestionEventoComponent, 
        canActivate : [AuthGuard]  
      },
      { 
        path : 'registro/departamento', 
        component : GestionDepartamentoComponent, 
        canActivate : [AuthGuard]  
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
