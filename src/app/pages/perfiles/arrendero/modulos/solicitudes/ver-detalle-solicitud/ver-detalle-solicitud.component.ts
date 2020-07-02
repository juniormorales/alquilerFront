import { Component, OnInit } from '@angular/core';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ver-detalle-solicitud',
  templateUrl: './ver-detalle-solicitud.component.html',
  styles: [
  ]
})
export class VerDetalleSolicitudComponent implements OnInit {

  input_sol_prop: ISolicitudPropiedad;
  
  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef
  ) { }
  ngOnInit(): void {
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }
}
