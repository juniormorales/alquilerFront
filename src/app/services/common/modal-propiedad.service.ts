import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';
import { Observable } from 'rxjs';
import { IUPropiedadComponent } from 'src/app/pages/perfiles/arrendero/modulos/mis-propiedades/modals/IU-propiedad/iu-propiedad.component';
import { EditarEstadoPropiedadComponent } from 'src/app/pages/perfiles/arrendero/modulos/mis-propiedades/modals/editar-estado-propiedad/editar-estado-propiedad.component';
import { AgregarImagenComponent } from 'src/app/pages/perfiles/arrendero/modulos/mis-propiedades/modals/agregar-imagen/agregar-imagen.component';
import { EliminarImagenComponent } from 'src/app/pages/perfiles/arrendero/modulos/mis-propiedades/modals/eliminar-imagen/eliminar-imagen.component';

@Injectable({
  providedIn: 'root'
})
export class ModalPropiedadService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalUIPropiedad(obj: IPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false,
    }
    this.modalRef = this.bsModalService.show(IUPropiedadComponent, config);
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if(reason === "CERRAR"){
          observer.error();
        }else{
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          subscripcion.unsubscribe();
        }
      }
    });
  }

  modalEditarEstadoPropiedad(obj: IPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(EditarEstadoPropiedadComponent, config);
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if(reason === "CERRAR"){
          observer.error();
        }else{
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          subscripcion.unsubscribe();
        }
      }
    });
  }

  modalSubirImagen(obj: IPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(AgregarImagenComponent, config);
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if(reason === "CERRAR"){
          observer.error();
        }else{
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          subscripcion.unsubscribe();
        }
      }
    });
  }

  modalEliminarImagen(obj: IPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false,
      class: 'gray modal-lg',
    }
    this.modalRef = this.bsModalService.show(EliminarImagenComponent, config);
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if(reason === "CERRAR"){
          observer.error();
        }else{
          observer.complete();
        }
      });

      return {
        unsubscribe() {
          subscripcion.unsubscribe();
        }
      }
    });
  }
}
