import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

//Librerias externas
import { ToastrModule } from "ngx-toastr";

//Rutas
import { AppRoutingModule } from './app-routing.module';

//Componentes principales
import { Not404Component } from './pages/not404/not404.component';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from 'src/utils/interceptor';

//Token
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

//ZONA HORARIA
import { registerLocaleData } from '@angular/common';
import localesPE from '@angular/common/locales/es-PE'
registerLocaleData(localesPE,'es-Pe');

//MAPS
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    AppComponent,
    Not404Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem("token");
        },
        whitelistedDomains: [environment.urlLocalHost],
        blacklistedRoutes: [environment.urlOauth]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,  
      multi: true,      
    },
    { provide:LOCALE_ID,useValue:'es-Pe' }
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
