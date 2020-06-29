import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';

@Component({
  selector: 'app-editar-estado-propiedad',
  templateUrl: './editar-estado-propiedad.component.html',
  styles: [
  ]
})
export class EditarEstadoPropiedadComponent implements OnInit {

  input_propiedad: IPropiedad;

  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef
  ) { }

  ngOnInit(): void {
  }

  actualizar(){

  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

}
