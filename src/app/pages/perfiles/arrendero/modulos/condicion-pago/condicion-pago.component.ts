import { Component, OnInit } from '@angular/core';
import { CondicionPagoService } from 'src/app/services/apis/condicion-pago.service';
import { ModalCondicionPagoService } from 'src/app/services/common/modal-condicion-pago.service';
import { ICondicionPago } from 'src/models/ICondicionPago';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-condicion-pago',
  templateUrl: './condicion-pago.component.html'
})
export class CondicionPagoComponent implements OnInit {
  

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsCondicionPago: ICondicionPago[] = [];
  idArrendero: number;

  constructor(
    private condicionPagoService: CondicionPagoService,
    private modalService: ModalCondicionPagoService,
  ) { }

  ngOnInit() {
    this.idArrendero = Number.parseInt(sessionStorage.getItem('id'));
    this.listarCondicionPago();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsCondicionPago.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  //WEB SERVICES
  listarCondicionPago() {
    this.condicionPagoService.listarCondicionPago(this.idArrendero).subscribe((resp: any) => {
    this.lsCondicionPago = resp.aaData;
    this.llenarTabla();
  });
  }


  //Modal
  private openModal(obj) {
    this.modalService.modalUICondicionPago(obj).subscribe(resp => {}, err => {}, () => {
      this.listarCondicionPago();
    });
  }

  nuevoCondicionPago(){
    this.openModal(null);
  }

  editarCondicionPago(condicion) {
    this.openModal(condicion);
  }

  eliminarCondicionPago(condicion: ICondicionPago) {
    Swal.fire({
      title: 'Eliminar Condicion de Pago',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: '¿Estas seguro de eliminar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.condicionPagoService.eliminarCondicionPago(condicion.idCondicionPago).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.listarCondicionPago();
        })
      }
    })
  }

}
