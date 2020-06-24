import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrendatarioComponent } from './arrendatario.component';
import { PresentacionPropiedadesComponent } from './presentacion-propiedades/presentacion-propiedades.component';
import { ArrendatarioRoutingModule } from './arrendatario.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [
    ArrendatarioComponent, 
    PresentacionPropiedadesComponent
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
