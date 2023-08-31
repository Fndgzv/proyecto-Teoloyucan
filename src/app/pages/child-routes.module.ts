import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AltaSolicitudComponent } from './alta-solicitud/alta-solicitud.component';



const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuración de usuario' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi perfil' } },
  { path: 'altaSolicitud', component: AltaSolicitudComponent, data: { titulo: 'Alta de Solicitud' } }
]



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
