import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { IArrendatario } from 'src/models/IArrendatario';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/models/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class ArrendatarioService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  registrarArrendatario(arrendatario: IArrendatario){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'arrendatario/registrar',arrendatario).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  listarCuentasDesactivadas(){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'usuario/listarDesactivadas').pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  activarCuenta(user: IUsuario){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'usuario/activarCuenta',user).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  desactivarCuenta(user: IUsuario){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'usuario/desactivarCuenta',user).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  private errorHandler(err: HttpErrorResponse) {
    this.spinner.hide();
    if (err.status == 0) {
      Swal.fire('Error', environment.msg_servicio_no_disponible, 'error')
    } else {
      Swal.fire('Error ' + err.status + ' ' + err.error.mensaje, 'Detalles: ' + err.error.error, 'error');
    }
    return Observable.throw(err);
  }
}
