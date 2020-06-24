import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { DashboardAdminComponent } from './modulos/dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const AdministracionRoute: Routes = [
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

@NgModule({
    imports:[RouterModule.forChild(AdministracionRoute)],
    exports: [ RouterModule]
})
export class AdministracionRoutingModule { }