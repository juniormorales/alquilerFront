import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ArrenderoComponent } from './arrendero.component';
import { CondicionPagoComponent } from './modulos/condicion-pago/condicion-pago.component';
import { MisPropiedadesComponent } from './modulos/mis-propiedades/mis-propiedades.component';
import { DashboardArrenderoComponent } from './modulos/dashboard-arrendero/dashboard-arrendero.component';
import { PagoInquilinoComponent } from './modulos/pago-inquilino/pago-inquilino.component';
import { RecibosComponent } from './modulos/recibos/recibos.component';
import { ContratosComponent } from './modulos/contratos/contratos.component';
import { SolicitudesComponent } from './modulos/solicitudes/solicitudes.component';
import { GestionInquilinoComponent } from './modulos/gestion-inquilino/gestion-inquilino.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PagoPorAceptarComponent } from './modulos/pago-por-aceptar/pago-por-aceptar.component';
import { ContratosPendientesComponent } from './modulos/contratos-pendientes/contratos-pendientes.component';

const ArrenderoRoute: Routes = [
    {
        path:"arrendero",
        component: ArrenderoComponent,
        children: [
            {
                path:'dashboard',
                component: DashboardArrenderoComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'condicion-pago',
                component: CondicionPagoComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'mis-propiedades',
                component: MisPropiedadesComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'gestion-inquilino',
                component: GestionInquilinoComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'pagos',
                component: PagoInquilinoComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'recibos',
                component: RecibosComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'contratos',
                component: ContratosComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'solicitudes',
                component: SolicitudesComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'por-aceptar',
                component: PagoPorAceptarComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'contrat-pend',
                component: ContratosPendientesComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(ArrenderoRoute)],
    exports: [ RouterModule ]
})
export class ArrenderoRoutingModule {}