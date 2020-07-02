import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPropiedad } from 'src/models/IPropiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  registrarPropiedad(propiedad: IPropiedad) {
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'propiedad/registrar', propiedad).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  modificarPropiedad(propiedad: IPropiedad) {
    this.spinner.show();
    return this.http.put(environment.urlApiRest + 'propiedad/modificar', propiedad).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  eliminarPropiedad(idPropiedad: number) {
    this.spinner.show();
    return this.http.delete(environment.urlApiRest + 'propiedad/eliminar/'+idPropiedad).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  listarPropiedades(idArrendatario: number) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'propiedad/listar/' + idArrendatario).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  subirImagen(file: File, id) {
    this.spinner.show();
    let formData = new FormData();
    formData.append("archivo", file);
    formData.append("id", id);
    return this.http.post(environment.urlApiRest + "img-prop/uploadImage", formData).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      })
      , catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  eliminarFotos(fotos){
    this.spinner.show();
    return this.http.post(environment.urlApiRest + 'img-prop/eliminarImagenes',fotos).pipe(
      map(obj => {
        this.spinner.hide();
        return obj;
      }),
      catchError((err: HttpErrorResponse) => this.errorHandler(err))
    );
  }

  listarImagenes(id) {
    this.spinner.show();
    return this.http.get(environment.urlApiRest + 'img-prop/listarImagenes/' + id).pipe(
      map((obj: any) => {
        this.spinner.hide();
        obj.aaData.forEach(element => {
          var url = "data:image/png;base64," + element.foto;
          element.foto = url;
          return element;
        });
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
