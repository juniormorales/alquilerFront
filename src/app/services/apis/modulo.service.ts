import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }
  url: string = environment.urlApiRest;

  public listarModulos(perfil) {
    this.spinner.show();
    return this.http.post(this.url + 'modulo/listarPorPerfil', perfil).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  private errorHandler(err) {
    this.spinner.hide();
    if (err.status == 0) {
      Swal.fire('Error', environment.msg_servicio_no_disponible, 'error')
    } else {
      Swal.fire('Error ' + err.status + ' ' + err.error.mensaje, 'Detalles: ' + err.error.error, 'error');
    }
    return Observable.throw(err);
  }
}
