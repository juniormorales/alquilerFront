import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdministracionComponent } from './administracion.component';
import { RouterModule } from '@angular/router';
import { AdministracionRoutingModule } from './administracion.routes';
import { DashboardAdminComponent } from './modulos/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AdministracionComponent,
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
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
export class AdministracionModule { }
