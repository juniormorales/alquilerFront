import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdministracionComponent } from './administracion.component';
import { RouterModule } from '@angular/router';
import { AdministracionRoute } from './administracion.routes';
import { DashboardAdminComponent } from './modulos/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [
    AdministracionComponent,
    DashboardAdminComponent
  ],
  imports: [
    RouterModule.forChild(AdministracionRoute),
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
export class AdministracionModule{ }
