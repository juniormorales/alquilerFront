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
import { PagoPorAceptarComponent } from './modulos/pago-por-aceptar/pago-por-aceptar.component';
import { ContratosPendientesComponent } from './modulos/contratos-pendientes/contratos-pendientes.component';

//Modals
import { IUPropiedadComponent } from './modulos/mis-propiedades/modals/IU-propiedad/iu-propiedad.component';
import { EditarEstadoPropiedadComponent } from './modulos/mis-propiedades/modals/editar-estado-propiedad/editar-estado-propiedad.component';
import { IUCondicionPagoComponent } from './modulos/condicion-pago/modals/iu-condicion-pago/iu-condicion-pago.component';

//Rutas
import { ArrenderoRoutingModule } from './arrendero.routes';

//Modulos
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalPropiedadService } from 'src/app/services/common/modal-propiedad.service';
import { ModalCondicionPagoService } from 'src/app/services/common/modal-condicion-pago.service';
import { AgregarImagenComponent } from './modulos/mis-propiedades/modals/agregar-imagen/agregar-imagen.component';
import { EliminarImagenComponent } from './modulos/mis-propiedades/modals/eliminar-imagen/eliminar-imagen.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { VerDetalleSolicitudComponent } from './modulos/solicitudes/ver-detalle-solicitud/ver-detalle-solicitud.component';
import { ModalVerDetalleSolService } from 'src/app/services/common/modal-ver-detalle-sol.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AlertModule } from "ngx-bootstrap/alert";


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
    IUCondicionPagoComponent,
    IUPropiedadComponent,
    EditarEstadoPropiedadComponent,
    AgregarImagenComponent,
    EliminarImagenComponent,
    VerDetalleSolicitudComponent,
  ],
  imports: [
    CommonModule,
    ArrenderoRoutingModule,
    CollapseModule.forRoot(),
    SharedModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
  ],
  providers:[
    ModalPropiedadService,
    ModalCondicionPagoService,
    ModalVerDetalleSolService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
    ArrenderoComponent
  ]
})
export class ArrenderoModule { }
