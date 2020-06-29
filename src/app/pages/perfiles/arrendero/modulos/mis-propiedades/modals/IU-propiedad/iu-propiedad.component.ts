import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';

@Component({
  selector: 'app-iu-propiedad',
  templateUrl: './iu-propiedad.component.html',
  styles: [
  ]
})
export class IUPropiedadComponent implements OnInit {

  input_propiedad: IPropiedad;
  
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

   //Eventos de boton
   public crud() {
 
  }

}
