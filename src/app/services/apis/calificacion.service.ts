import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  
  listarCalificacionPorArrendatario(idArrendatario: number){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'calificacion/listarCalificacionPorArrendatario/'+idArrendatario).pipe(
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
