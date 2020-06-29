import { Component, OnInit } from '@angular/core';
import { ICondicionPago } from 'src/models/ICondicionPago';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-iu-condicion-pago',
  templateUrl: './iu-condicion-pago.component.html',
  styles: [
  ]
})
export class IUCondicionPagoComponent implements OnInit {

  input_condicion_pago: ICondicionPago;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  //Eventos de boton
  public crud() {
 
  }
}
