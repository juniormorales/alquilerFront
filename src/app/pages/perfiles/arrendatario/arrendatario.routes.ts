
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrendatarioComponent } from './arrendatario.component';
import { PresentacionPropiedadesComponent } from './modulos/presentacion-propiedades/presentacion-propiedades.component';
import { SolHechasComponent } from './modulos/sol-hechas/sol-hechas.component';
import { SolAceptadasComponent } from './modulos/sol-aceptadas/sol-aceptadas.component';
import { PagosPorVencerComponent } from './modulos/pagos-por-vencer/pagos-por-vencer.component';
import { MisBoletasComponent } from './modulos/mis-boletas/mis-boletas.component';
import { DeudasPendientesComponent } from './modulos/deudas-pendientes/deudas-pendientes.component';
import { RecordPagosComponent } from './modulos/record-pagos/record-pagos.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const ArrendatarioRoutes: Routes = [
    {
        path:"arrendatario",
        component: ArrendatarioComponent,
        children: [
            {
                path:'buscar',
                component: PresentacionPropiedadesComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'sol-hechas',
                component: SolHechasComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'sol-aceptadas',
                component: SolAceptadasComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'boletas',
                component: MisBoletasComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'por-vencer',
                component: PagosPorVencerComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'deudas',
                component: DeudasPendientesComponent,
                canActivate: [AuthGuard]
            },{
                path:'pagos',
                component: RecordPagosComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(ArrendatarioRoutes)],
    exports: [ RouterModule ]
})
export class ArrendatarioRoutingModule { }