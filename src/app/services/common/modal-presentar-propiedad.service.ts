import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { VerPropiedadInfoComponent } from 'src/app/pages/perfiles/arrendatario/modulos/presentacion-propiedades/ver-propiedad-info/ver-propiedad-info.component';

@Injectable({
  providedIn: 'root'
})
export class ModalPresentarPropiedadService {

  modalRef: BsModalRef
  constructor(
    private bsModalService: BsModalService
  ) { }

  modalVerPropiedadInfo(obj): Observable<any> {
    const config: ModalOptions = {
      initialState:  {
        input_propiedad_map: obj
      },
      animated: true,
      ignoreBackdropClick: true,
      backdrop: "static",
      keyboard: false,
      class: 'gray modal-lg',
    }
    this.modalRef = this.bsModalService.show(VerPropiedadInfoComponent, config);
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