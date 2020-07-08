import { Component, OnInit } from '@angular/core';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-visualizar-recibo',
  templateUrl: './visualizar-recibo.component.html',
  styleUrls: ['./visualizar-recibo.component.scss']
})
export class VisualizarReciboComponent implements OnInit {

  
  input_sol_prop: ISolicitudPropiedad;
  constructor( private modalService : BsModalService,
    private bsModalRef : BsModalRef) { }

  ngOnInit(): void {
  }


   //Metodos modal
   public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }
}
