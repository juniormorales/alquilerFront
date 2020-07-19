import { Injectable } from '@angular/core';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { IInquilino } from 'src/models/IInquilino';
import { FechaInicioContratoComponent } from 'src/app/pages/perfiles/arrendero/modulos/contratos-pendientes/modals/fecha-inicio-contrato/fecha-inicio-contrato.component';

@Injectable({
  providedIn: 'root'
})
export class ModalContratoService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalSetFechaInicioContrato(inquilino: IInquilino): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_inquilino: inquilino
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false,
    }
    this.modalRef = this.bsModalService.show(FechaInicioContratoComponent, config);
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
