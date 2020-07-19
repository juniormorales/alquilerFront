import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { IPago } from 'src/models/IPago';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }


  enviarPagoParaConfirmacion(pago: IPago){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'pagos/enviarPagoConfirmacion',pago).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  listarPagosPendientesPorConfirmar(idArrendero: number){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'pagos/listarPagosPorConfirmar/'+idArrendero).pipe(
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
