import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdministracionComponent } from './administracion.component';
import { RouterModule } from '@angular/router';
import { AdministracionRoutingModule } from './administracion.routes';
import { DashboardAdminComponent } from './modulos/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { GestionCuentasComponent } from './modulos/gestion-cuentas/gestion-cuentas.component';
import { SolicitudesPendientesComponent } from './modulos/solicitudes-pendientes/solicitudes-pendientes.component';



@NgModule({
  declarations: [
    AdministracionComponent,
    DashboardAdminComponent,
    GestionCuentasComponent,
    SolicitudesPendientesComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    CollapseModule.forRoot(),
    SharedModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap:[
    AdministracionComponent
  ]
})
export class AdministracionModule { }
