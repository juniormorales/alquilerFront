import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

//katriel
import { VisualizarReciboComponent } from 'src/app/pages/perfiles/arrendero/modulos/pago-por-aceptar/visualizar-recibo/visualizar-recibo.component';
import { IPago } from '../../../models/IPago';
//

@Injectable({
  providedIn: 'root'
})
export class ModalVisualizarReciboService {

  
  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

 //katriel
  modalVerRecibo(obj: IPago): Observable<any> {
  const config: ModalOptions = {
    initialState:  {
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
//

}
