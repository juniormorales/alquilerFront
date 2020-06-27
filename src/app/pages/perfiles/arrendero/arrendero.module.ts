import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes principales
import { ArrenderoComponent } from './arrendero.component';
import { CondicionPagoComponent } from './modulos/condicion-pago/condicion-pago.component';
import { MisPropiedadesComponent } from './modulos/mis-propiedades/mis-propiedades.component';
import { DashboardArrenderoComponent } from './modulos/dashboard-arrendero/dashboard-arrendero.component';
import { PagoInquilinoComponent } from './modulos/pago-inquilino/pago-inquilino.component';
import { GestionInquilinoComponent } from './modulos/gestion-inquilino/gestion-inquilino.component';
import { RecibosComponent } from './modulos/recibos/recibos.component';
import { ContratosComponent } from './modulos/contratos/contratos.component';
import { SolicitudesComponent } from './modulos/solicitudes/solicitudes.component';

//Rutas
import { ArrenderoRoutingModule } from './arrendero.routes';

//Modulos
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PagoPorAceptarComponent } from './modulos/pago-por-aceptar/pago-por-aceptar.component';
import { ContratosPendientesComponent } from './modulos/contratos-pendientes/contratos-pendientes.component';



@NgModule({
  declarations: [
    ArrenderoComponent,
    CondicionPagoComponent,
    MisPropiedadesComponent,
    DashboardArrenderoComponent,
    PagoInquilinoComponent,
    GestionInquilinoComponent,
    RecibosComponent,
    ContratosComponent,
    SolicitudesComponent,
    PagoPorAceptarComponent,
    ContratosPendientesComponent,
  ],
  imports: [
    CommonModule,
    ArrenderoRoutingModule,
    CollapseModule.forRoot(),
    SharedModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
    ArrenderoComponent
  ]
})
export class ArrenderoModule { }
