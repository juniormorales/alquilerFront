import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { VerDetalleSolicitudComponent } from 'src/app/pages/perfiles/arrendero/modulos/solicitudes/ver-detalle-solicitud/ver-detalle-solicitud.component';
import { EditarSolicitudComponent } from 'src/app/pages/perfiles/arrendatario/modulos/sol-hechas/editar-solicitud/editar-solicitud.component';

@Injectable({
  providedIn: 'root'
})
export class ModalVerDetalleSolService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalVerDetalleSolicitante(obj: ISolicitudPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_sol_prop: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(VerDetalleSolicitudComponent, config);
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

  modalEditarSolicitud(obj: ISolicitudPropiedad): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_sol_prop: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(EditarSolicitudComponent, config);
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
