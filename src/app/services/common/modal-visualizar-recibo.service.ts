import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { VisualizarReciboComponent } from 'src/app/pages/perfiles/arrendero/modulos/pago-por-aceptar/visualizar-recibo/visualizar-recibo.component';
import { IPago } from '../../../models/IPago';
import { IRenta } from 'src/models/IRenta';
import { RegistroPagoComponent } from 'src/app/pages/perfiles/arrendatario/modulos/pagos-por-vencer/registro-pago/registro-pago.component';


@Injectable({
  providedIn: 'root'
})
export class ModalVisualizarReciboService {


  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }


  modalVerRecibo(obj: IPago): Observable<any> {
    const config: ModalOptions = {
      initialState: {
        input_pago: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(VisualizarReciboComponent, config);
    return new Observable<any>(observer => {
      const subscripcion = this.bsModalService.onHidden.subscribe((reason: any) => {
        if (reason === "CERRAR") {
          observer.error();
        } else {
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

  modalRegistrarPago(renta: IRenta): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_renta: renta
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(RegistroPagoComponent, config);
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
