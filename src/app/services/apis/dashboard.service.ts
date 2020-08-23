import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }


  public listarGananciasAnuales(idarrendero: Number, jsonAnio: any) {
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'dashboard/ganancias/'+idarrendero, jsonAnio).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public listarCantidadSolPorPropiedad(idarrendero: Number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'dashboard/solicitudPorPropiedad/'+idarrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public listarCantidadInquilinosAlDia(idarrendero: Number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'dashboard/cantidadInquilinosAlDia/'+idarrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public listarCantidadInquilinosDeudores(idarrendero: Number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'dashboard/cantidadInquilinosDeudores/'+idarrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public listarCantidadPagosPorconfirmar(idarrendero: Number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'dashboard/cantidadPagosPorconfirmar/'+idarrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  public listarCantidadSolicitudesPendientes(idarrendero: Number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'dashboard/cantidadSolicitudesPendientes/'+idarrendero).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
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
