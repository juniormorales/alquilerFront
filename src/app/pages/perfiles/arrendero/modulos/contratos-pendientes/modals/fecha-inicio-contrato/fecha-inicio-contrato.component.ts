import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IInquilino } from 'src/models/IInquilino';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContratoService } from 'src/app/services/apis/contrato.service';

@Component({
  selector: 'app-fecha-inicio-contrato',
  templateUrl: './fecha-inicio-contrato.component.html',
  styles: [
  ]
})
export class FechaInicioContratoComponent implements OnInit {

  input_inquilino: IInquilino;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private contratoService: ContratoService,
  ) { }

  ngOnInit(): void {
    this.input_inquilino.fecha_inicio = new Date();
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  crearContrato() {
    console.log(this.input_inquilino)
    Swal.fire({
      title: 'Crear Contrato',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'Una vez que cree el contrato, el tiempo de arrendamiento empezará',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, crear contrato!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.contratoService.crearContrato(this.input_inquilino).subscribe((resp: any) => {
          Swal.fire(resp.titulo, resp.mensaje, resp.tipo);
          this.bsModalRef.hide();
        })
      }
    });
  }

}
