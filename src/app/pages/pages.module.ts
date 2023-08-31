import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AltaSolicitudComponent } from './alta-solicitud/alta-solicitud.component';


//PrimeNG
import { CardModule} from 'primeng/card' ;
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    FileUploadModule,
    ToastModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent

  ],
  declarations: [
    PagesComponent,
    DashboardComponent,
    AccountSettingsComponent,
    PerfilComponent,
    AltaSolicitudComponent
  ],
})
export class PagesModule { }