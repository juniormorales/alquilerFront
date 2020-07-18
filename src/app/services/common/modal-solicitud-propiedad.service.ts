import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, ModalOptions, BsModalRef } from 'ngx-bootstrap/modal';
import { ProponerSolicitudPropiedadComponent } from 'src/app/pages/perfiles/arrendatario/modulos/presentacion-propiedades/proponer-solicitud-propiedad/proponer-solicitud-propiedad.component';

@Injectable({
  providedIn: 'root'
})
export class ModalSolicitudPropiedadService {

  modalRef: BsModalRef

  constructor(
    private bsModalService: BsModalService
  ) { }

  modalFormularPropuestaSolicitud(obj): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false,
    }
    this.modalRef = this.bsModalService.show(ProponerSolicitudPropiedadComponent, config);
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
