import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPropiedadService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }


  listarSolicitudesEnTramiteParaArrendero(idArrendero: number){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'sol-prop/listarParaArrendero/'+idArrendero).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  listarSolicitudesParaArrendatario(idArrendatario: number){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'sol-prop/listarParaArrendatario/'+idArrendatario).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }

  
  listarSolAceptadasArrendatario(idArrendatario: number){
    this.spinner.show();
    return this.http.get( environment.urlApiRest + 'sol-prop/listarSolAcep/'+idArrendatario).pipe(
      map( obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err:HttpErrorResponse)=> this.errorHandler(err))
    );
  }listarSolAcep

  editarSolicitudArrendatario(sol:ISolicitudPropiedad){
    this.spinner.show();
    return this.http.post( environment.urlApiRest + 'sol-prop/modificar',sol).pipe(
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
