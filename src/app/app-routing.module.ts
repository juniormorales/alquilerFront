import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Not404Component } from './pages/not404/not404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/inicio",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: ()=> import('./pages/perfiles/administrador/administracion.module').then( m => m.AdministracionModule) 
  },
  {
    path: "",
    loadChildren: ()=> import('./pages/perfiles/arrendero/arrendero.module').then( m => m.ArrenderoModule)
  },
  {
    path: "",
    loadChildren: ()=> import('./pages/perfiles/arrendatario/arrendatario.module').then( m => m.ArrendatarioModule)
  },
  {
    path: '',
    loadChildren: ()=> import('./pages/inicio/inicio.module').then( m => m.InicioModule)
  },
  {
    path: "not-404",
    component: Not404Component
  },
  {
    path: "**",
    redirectTo: "not-404"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
