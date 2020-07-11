import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUbicacionMaps } from 'src/models/IUbicacionMaps';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  registrarPropiedad(ubicacion: IUbicacionMaps) {
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'maps/registrarMaps', ubicacion).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }
  
  listarPropiedadesDisponibles(){
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'maps/listarDisponibles').pipe(
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
