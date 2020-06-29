import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NavbarAuthComponent } from './navbar-auth/navbar-auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioRoutingModule } from './inicio.routes';
import { InicioComponent } from './inicio.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ContenidoComponent } from './contenido/contenido.component';
import { RegistrarseClientComponent } from './registrarse-client/registrarse-client.component';
import { RegistrarseLordlandComponent } from './registrarse-lordland/registrarse-lordland.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CardRegistroGeneralComponent } from './card-registro-general/card-registro-general.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    InicioComponent,
    NavbarAuthComponent,
    LoginComponent,
    ContenidoComponent,
    RegistrarseClientComponent,
    RegistrarseLordlandComponent,
    CardRegistroGeneralComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMultiSelectModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    BsDatepickerModule.forRoot(),
    InicioRoutingModule,
    CollapseModule.forRoot(),
    PerfectScrollbarModule,
    CarouselModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [
    InicioComponent
  ]
})
export class InicioModule { }
