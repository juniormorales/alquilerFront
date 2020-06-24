import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from "@angular/common";
import { Observable, Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/apis/login.service';


@Component({
  selector: 'app-auth-navbar',
  templateUrl: './navbar-auth.component.html',
})
export class NavbarAuthComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  location: Location;
  mostrarBack: boolean;
  isLogged: boolean = false;

  @Input() events: Observable<boolean>;
  private eventsSubscription: Subscription;

  constructor(
    location: Location,
    private loginService: LoginService,
    ) {
    this.location = location;
  }

  ngOnInit() {
    if(sessionStorage.getItem('sesion')!=null){
      this.isLogged = true;
    }

    this.eventsSubscription = this.events.subscribe((mostrar:boolean) => {
      this.mostrarBack = mostrar;
    });
  }

  ngOnDestroy(){
    this.eventsSubscription.unsubscribe();
  }

  cerrarSesion(){
    this.loginService.logOut();
    this.isLogged = false;
  }

  backModulo(){
    this.loginService.redirigirModulo();
  }
}
