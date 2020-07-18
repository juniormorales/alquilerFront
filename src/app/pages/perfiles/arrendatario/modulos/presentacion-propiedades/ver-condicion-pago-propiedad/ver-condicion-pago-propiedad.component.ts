import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ver-condicion-pago-propiedad',
  templateUrl: './ver-condicion-pago-propiedad.component.html'
})
export class VerCondicionPagoPropiedadComponent implements OnInit {

  input_condicion_pago: any;

  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef,
  ) { }

  ngOnInit(): void {
  }

   //Metodos modal
   public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }
}
