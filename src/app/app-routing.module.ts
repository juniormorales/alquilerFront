import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Not404Component } from './pages/not404/not404.component';
import { AdministracionModule } from './pages/perfiles/administrador/administracion.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioModule } from './pages/inicio/inicio.module';

const routes: Routes = [
    {
      path: "",
      redirectTo: "/inicio",
      pathMatch: "full"
    },
    {
        path:"",
        loadChildren: './pages/perfiles/administrador/administracion.module#AdministracionModule'
    },/*
    {
      path: "",
      component: AdministracionComponent,
      children: [
        {
          path: "",
          loadChildren:
            "./pages/examples/dashboard/dashboard.module#DashboardModule"
        },
        {
          path: "components",
          loadChildren:
            "./pages/examples/components/components.module#ComponentsPageModule"
        },
        {
          path: "forms",
          loadChildren: "./pages/examples/forms/forms.module#Forms"
        },
        {
          path: "tables",
          loadChildren: "./pages/examples/tables/tables.module#TablesModule"
        },
        {
          path: "maps",
          loadChildren: "./pages/examples/maps/maps.module#MapsModule"
        },
        {
          path: "widgets",
          loadChildren: "./pages/examples/widgets/widgets.module#WidgetsModule"
        },
        {
          path: "charts",
          loadChildren: "./pages/examples/charts/charts.module#ChartsModule"
        },
        {
          path: "calendar",
          loadChildren:
            "./pages/examples/calendar/calendar.module#CalendarModulee"
        },
        {
          path: "",
          loadChildren:
            "./pages/examples/pages/user/user-profile.module#UserModule"
        },
        {
          path: "",
          loadChildren:
            "./pages/examples/pages/timeline/timeline.module#TimelineModule"
        }
      ]
    },*/
    {
      path: '',
      loadChildren: './pages/inicio/inicio.module#InicioModule'
    },
    {
        path:"not-404",
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
  export class AppRoutingModule {}
  