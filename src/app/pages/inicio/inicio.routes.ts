import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { LoginComponent } from './login/login.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { RegistrarseClientComponent } from './registrarse-client/registrarse-client.component';
import { RegistrarseLordlandComponent } from './registrarse-lordland/registrarse-lordland.component';
import { NgModule } from '@angular/core';

const InicioRoutes: Routes = [
    {
        path:"inicio",
        component: InicioComponent,
        children: [
            {
                path:'',
                component: ContenidoComponent
            },
            {
                path:'login',
                component: LoginComponent
            },
            {
                path:'register-client',
                component: RegistrarseClientComponent
            },
            {
                path:'register-lordland',
                component: RegistrarseLordlandComponent
            }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(InicioRoutes)],
    exports: [ RouterModule ]
})
export class InicioRoutingModule { }