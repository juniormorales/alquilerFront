import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { NgModule } from '@angular/core';
import { GestionCuentasComponent } from './modulos/gestion-cuentas/gestion-cuentas.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { SolicitudesPendientesComponent } from './modulos/solicitudes-pendientes/solicitudes-pendientes.component';
import { ConfirmarPropiedadesComponent } from './modulos/confirmar-propiedades/confirmar-propiedades.component';

const AdministracionRoute: Routes = [
    {
        path:"administracion",
        component: AdministracionComponent,
        children: [
            {
                path:'cuentas',
                component: GestionCuentasComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'ver-sol',
                component: SolicitudesPendientesComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'propiedad-confirmar',
                component: ConfirmarPropiedadesComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(AdministracionRoute)],
    exports: [ RouterModule]
})
export class AdministracionRoutingModule { }