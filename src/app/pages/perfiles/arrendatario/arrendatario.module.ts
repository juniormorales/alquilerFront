import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrendatarioComponent } from './arrendatario.component';
import { PresentacionPropiedadesComponent } from './modulos/presentacion-propiedades/presentacion-propiedades.component';
import { ArrendatarioRoutingModule } from './arrendatario.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SolAceptadasComponent } from './modulos/sol-aceptadas/sol-aceptadas.component';
import { SolHechasComponent } from './modulos/sol-hechas/sol-hechas.component';
import { MisBoletasComponent } from './modulos/mis-boletas/mis-boletas.component';
import { PagosPorVencerComponent } from './modulos/pagos-por-vencer/pagos-por-vencer.component';
import { DeudasPendientesComponent } from './modulos/deudas-pendientes/deudas-pendientes.component';
import { RecordPagosComponent } from './modulos/record-pagos/record-pagos.component';



@NgModule({
  declarations: [
    ArrendatarioComponent, 
    PresentacionPropiedadesComponent, SolAceptadasComponent, SolHechasComponent, MisBoletasComponent, PagosPorVencerComponent, DeudasPendientesComponent, RecordPagosComponent
  ],
  imports: [
    CommonModule,
    ArrendatarioRoutingModule,
    SharedModule,
    CollapseModule.forRoot()
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    ArrendatarioComponent
  ]
})
export class ArrendatarioModule { }
