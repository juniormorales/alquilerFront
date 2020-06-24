import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes principales
import { ArrenderoComponent } from './arrendero.component';
import { CondicionPagoComponent } from './condicion-pago/condicion-pago.component';

//Rutas
import { ArrenderoRoutingModule } from './arrendero.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    ArrenderoComponent,
    CondicionPagoComponent,
  ],
  imports: [
    CommonModule,
    ArrenderoRoutingModule,
    CollapseModule.forRoot(),
    SharedModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  bootstrap: [
    ArrenderoComponent
  ]
})
export class ArrenderoModule { }
