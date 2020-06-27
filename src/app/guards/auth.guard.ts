import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/apis/login.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {

  estadologin: boolean = true;

  constructor(
    private loginService: LoginService,
  ) { }

  canActivate() {
    this.loginService.verificaToken().subscribe( (resp:any)=>{
      this.estadologin = true;
    },(err:any)=>{
      this.estadologin = false;
      this.loginService.logOut();
    })
    return this.estadologin;
  }
}
