import { Routes } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { DashboardAdminComponent } from './modulos/dashboard/dashboard.component';

export const AdministracionRoute: Routes = [
    {
        path:"administracion",
        component: AdministracionComponent,
        children: [
            {
                path:'dashboard',
                component: DashboardAdminComponent
            }
        ]
    }
]