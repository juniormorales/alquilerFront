
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArrendatarioComponent } from './arrendatario.component';
import { PresentacionPropiedadesComponent } from './presentacion-propiedades/presentacion-propiedades.component';

const ArrendatarioRoutes: Routes = [
    {
        path:"arrendatario",
        component: ArrendatarioComponent,
        children: [
            {
                path:'buscar',
                component: PresentacionPropiedadesComponent
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(ArrendatarioRoutes)],
    exports: [ RouterModule ]
})
export class ArrendatarioRoutingModule { }