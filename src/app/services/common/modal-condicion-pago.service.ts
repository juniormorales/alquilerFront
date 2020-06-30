import { Injectable } from '@angular/core';
import { ICondicionPago } from 'src/models/ICondicionPago';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { IUCondicionPagoComponent } from 'src/app/pages/perfiles/arrendero/modulos/condicion-pago/modals/iu-condicion-pago/iu-condicion-pago.component';

@Injectable({
  providedIn: 'root'
})
export class ModalCondicionPagoService {

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
}
