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


  enviarPagoParaConfirmacion(pago: IPago) {
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'pagos/enviarPagoConfirmacion', pago).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  rechazarPago(pago: IPago) {
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'pagos/rechazarPago', pago).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  confirmarPago(pago: IPago) {
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'pagos/confirmarPago', pago).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  subirImagenVoucher(file: File, id) {
    this.spinner.show();
    let formData = new FormData();
    formData.append("archivo", file);
    formData.append("id", id);
    return this.http.post(environment.urlApiRest + "pagos/uploadImageVoucher", formData).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      })
      , catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  listarPagosPendientesPorConfirmar(idArrendero: number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'pagos/listarPagosPorConfirmar/' + idArrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  listarPagosTotalesInquilino(idInquilino: number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'pagos/listarPagosTotalInquilino/' + idInquilino).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  listarPagosArrenderoAceptados(idArrendero: number){
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'pagos/listarPagosTotalArrendero/' + idArrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public verFotoVoucher(id) {
    return environment.urlApiRest + "pagos/verVoucher/" + id;
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
