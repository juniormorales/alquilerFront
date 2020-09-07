import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { IInquilino } from 'src/models/IInquilino';
import { CalificarInquilinoComponent } from 'src/app/pages/perfiles/arrendero/modulos/gestion-inquilino/modals/calificar-inquilino/calificar-inquilino.component';

@Injectable({
  providedIn: 'root'
})
export class ModalCalificacionService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalCalificarInquilino(obj: IInquilino): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_inquilino: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false
    }
    this.modalRef = this.bsModalService.show(CalificarInquilinoComponent, config);
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
