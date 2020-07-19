import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { IPago } from '../../../../../../../models/IPago';
import { PagoService } from 'src/app/services/apis/pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-recibo',
  templateUrl: './visualizar-recibo.component.html',
  styleUrls: ['./visualizar-recibo.component.scss']
})
export class VisualizarReciboComponent implements OnInit {

  input_pago:IPago;
  imgURL:any;
  monto: number =0.0;
  disminuir: boolean = false;

  constructor( 
    private modalService : BsModalService,
    private bsModalRef : BsModalRef,
    private pagoService: PagoService
    ) { }

  ngOnInit(): void {
    console.log(this.input_pago)
    this.verFoto();
  }

  verFoto(){
    this.imgURL = this.pagoService.verFotoVoucher(this.input_pago.idPago);
  }


   //Metodos modal
   public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  confirmar(){
    this.input_pago.estado = true;
    this.input_pago.monto = this.monto;
    Swal.fire({
      title: 'Confirmar pago del inquilino',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'Esta a punto de confirmar el pago por el monto de S/.'+ this.monto + ', estas seguro?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Confirmar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.value) {
        this.pagoService.confirmarPago(this.input_pago).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.bsModalRef.hide();
        })
      }
    })
  }

  rechazar(){
    Swal.fire({
      title: 'Rechazar pago del inquilino',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'El pago sera rechazado por no ser un voucher valido, continuar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Rechazar!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.value) {
        this.pagoService.rechazarPago(this.input_pago).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.bsModalRef.hide();
        })
      }
    })
  }
}
