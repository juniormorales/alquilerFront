import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { IUCondicionPagoComponent } from 'src/app/pages/perfiles/arrendero/modulos/condicion-pago/modals/iu-condicion-pago/iu-condicion-pago.component';
import { ICondicionPago } from 'src/models/ICondicionPago';
import { IPropiedad } from 'src/models/IPropiedad';
import { IUPropiedadComponent } from 'src/app/pages/perfiles/arrendero/modulos/mis-propiedades/modals/IU-propiedad/iu-propiedad.component';
import { EditarEstadoPropiedadComponent } from 'src/app/pages/perfiles/arrendero/modulos/mis-propiedades/modals/editar-estado-propiedad/editar-estado-propiedad.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalUICondicionPago(obj: ICondicionPago): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_condicion_pago: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(IUCondicionPagoComponent, config);
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

  modalUIPropiedad(obj: IPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
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


}
