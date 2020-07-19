import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { IPago } from '../../../../../../../models/IPago';

@Component({
  selector: 'app-visualizar-recibo',
  templateUrl: './visualizar-recibo.component.html'
})
export class VisualizarReciboComponent implements OnInit {

  input_pago:IPago;

  constructor( private modalService : BsModalService,
    private bsModalRef : BsModalRef) { }

  ngOnInit(): void {
    console.log(this.input_pago)
  }


   //Metodos modal
   public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }
}
