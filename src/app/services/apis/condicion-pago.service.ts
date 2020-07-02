import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { IArrendatario } from 'src/models/IArrendatario';
import { ICondicionPago } from 'src/models/ICondicionPago';

@Injectable({
  providedIn: 'root'
})
export class CondicionPagoService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  registrarCondicionPago(condicionpago: ICondicionPago){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'condicion-pago/registrar',condicionpago).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  modificarCondicionPago(condicionpago: ICondicionPago){
    this.spinner.show();
    return this.http.put( environment.urlApiRest + 'condicion-pago/modificar',condicionpago).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  eliminarCondicionPago(idCondicion : number){
    this.spinner.show();
    return this.http.delete( environment.urlApiRest + 'condicion-pago/eliminar/'+idCondicion).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  listarCondicionPago(idArrendero: number){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'condicion-pago/listar/'+idArrendero).pipe(
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
