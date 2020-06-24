import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(
		private http: HttpClient,
		private spinner: NgxSpinnerService,
		private helper: JwtHelperService,
		private router: Router,
	) { }

	public logueate(usuario) {
		this.spinner.show();
		let url = environment.urlBack + 'oauth/token';
		const credenciales = btoa('alquiler:alquilerPass');

		const httpHeaders = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + credenciales
		});
		let params = new URLSearchParams();
		params.set('grant_type', 'password');
		params.set('username', usuario.username);
		params.set('password', usuario.password);
		return this.http.post(url, params.toString(), { headers: httpHeaders }).pipe(
			map((token: any) => {
				sessionStorage.setItem('sesion', token.access_token);
				this.spinner.hide();
				return token;
			}),
			catchError((err: HttpErrorResponse) => {
				this.spinner.hide();
				return Observable.throw(err);
			})
		);
	}

	public redirigirModulo(){
		const token = this.helper.decodeToken(sessionStorage.getItem('sesion'));
		switch(token.nombre_perfil){
			case "ADMINISTRADOR" : this.router.navigateByUrl('/administracion/dashboard') ;break;
			case 'ARRENDERO': this.router.navigateByUrl('/arrendero/condicion-pago') ;break;
			case 'ARRENDATARIO': this.router.navigateByUrl('/arrendatario/buscar') ;break;
		}
	}

	public logOut(){
		sessionStorage.clear();
		this.router.navigateByUrl('/inicio');
	}
}
