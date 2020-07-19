import { Component, OnInit } from '@angular/core';
import { ModalVisualizarReciboService } from './../../../../../services/common/modal-visualizar-recibo.service';
import { IPago } from '../../../../../../models/IPago';
import { PagoService } from 'src/app/services/apis/pago.service';


@Component({
  selector: 'app-pago-por-aceptar',
  templateUrl: './pago-por-aceptar.component.html',
  styles: [
  ]
})
export class PagoPorAceptarComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  idArrendero: number;
  lsPagos: IPago []=[];

  constructor(
    private modalService: ModalVisualizarReciboService,
    private pagoService: PagoService,
  ) { }

  ngOnInit(): void {
    this.idArrendero = Number.parseInt(sessionStorage.getItem('id'));
    this.listarPagosPorAceptar();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsPagos.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

  listarPagosPorAceptar() {
    this.pagoService.listarPagosPendientesPorConfirmar(this.idArrendero).subscribe((resp: any) => {
      this.lsPagos = resp.aaData;
      console.log(this.lsPagos)
      this.llenarTabla();
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  verRecibo(pago: IPago) {
    this.modalService.modalVerRecibo(pago).subscribe(resp => { }, err => { }, () => {
    });
  }

}
