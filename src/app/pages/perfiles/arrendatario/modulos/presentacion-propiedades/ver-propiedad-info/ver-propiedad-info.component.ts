import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import { ModalCondicionPagoService } from 'src/app/services/common/modal-condicion-pago.service';
import Swal from 'sweetalert2';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';
import { ModalSolicitudPropiedadService } from 'src/app/services/common/modal-solicitud-propiedad.service';

@Component({
  selector: 'app-ver-propiedad-info',
  templateUrl: './ver-propiedad-info.component.html'
})
export class VerPropiedadInfoComponent implements OnInit {

  input_propiedad_map: any;
  lsImagenes: any[] = [];

  //Variables de paginacion
  p: number = 1;

  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef,
    private propiedadService : PropiedadService,
    private modal2Service: ModalCondicionPagoService,
    private modalSolicitudService: ModalSolicitudPropiedadService,
  ) { }

  ngOnInit(): void {
    this.listarImagenes();
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  public solicitar() {
    this.modalSolicitudService.modalFormularPropuestaSolicitud(this.input_propiedad_map.propiedad).subscribe(resp=>{},err=>{},()=>{
      this.bsModalRef.hide();
    })
  }

  listarImagenes() {
    this.propiedadService.listarImagenes(this.input_propiedad_map.propiedad.idPropiedad).subscribe((resp: any) => {
      this.lsImagenes = resp.aaData;
    })
  }

  verCondicionPago(){
    this.modal2Service.modalVerCondicionPagoPropiedad(this.input_propiedad_map.propiedad.condicionPago).subscribe();
  }
}
