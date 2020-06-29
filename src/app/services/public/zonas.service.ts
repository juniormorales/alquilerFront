import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  constructor(
    public http: HttpClient,
    public spinner: NgxSpinnerService
  ) { }

  listarDepartamentos() {
    this.spinner.show();
    return this.http.get(environment.urlPublicRest + 'departamento/listar').pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      })
      , catchError((err: HttpErrorResponse)=> this.errorHandler(err))
      );
  }

  listarProvincias(dep) {
    this.spinner.show();
    return this.http.post(environment.urlPublicRest + 'provincia/porDepartamento', dep).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      })
      , catchError((err: HttpErrorResponse)=> this.errorHandler(err))
      );
  }

  listarDistritos(prov) {
    this.spinner.show();
    return this.http.post(environment.urlPublicRest + 'distrito/porProvincia', prov).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      })
      , catchError((err: HttpErrorResponse)=> this.errorHandler(err))
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
