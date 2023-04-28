import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PruebaComponent } from './prueba/prueba.component';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';

const routes: Routes = [
  { path : '' , redirectTo : 'dashboard', pathMatch : 'full'},
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
     /*  { 
        path : 'departamento/nuevo-departamento', 
        component : PruebaComponent, //prueba
        canActivate : [AuthGuard]  
      }, */
      { 
        path : 'gestión-usuario/nuevo-usuario', 
        component : GestionUsuarioComponent, 
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
