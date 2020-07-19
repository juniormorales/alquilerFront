import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IInquilino } from 'src/models/IInquilino';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentaService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }


  listarRentasPendientes(inquilino: IInquilino){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'renta/listarPendientesPorInquilino',inquilino).pipe(
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
