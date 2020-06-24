import { Routes, RouterModule } from '@angular/router';
import { ArrenderoComponent } from './arrendero.component';
import { CondicionPagoComponent } from './condicion-pago/condicion-pago.component';
import { NgModule } from '@angular/core';

const ArrenderoRoute: Routes = [
    {
        path:"arrendero",
        component: ArrenderoComponent,
        children: [
            {
                path:'condicion-pago',
                component: CondicionPagoComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(ArrenderoRoute)],
    exports: [ RouterModule ]
})
export class ArrenderoRoutingModule {}