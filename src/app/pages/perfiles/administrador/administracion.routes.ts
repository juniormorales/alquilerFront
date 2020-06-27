import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { DashboardAdminComponent } from './modulos/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { GestionCuentasComponent } from './modulos/gestion-cuentas/gestion-cuentas.component';
import { SolicitudesComponent } from '../arrendero/modulos/solicitudes/solicitudes.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const AdministracionRoute: Routes = [
    {
        path:"administracion",
        component: AdministracionComponent,
        children: [
            {
                path:'dashboard',
                component: DashboardAdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'cuentas',
                component: GestionCuentasComponent,
                canActivate: [AuthGuard]
            },
            {
                path:'ver-sol',
                component: SolicitudesComponent,
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