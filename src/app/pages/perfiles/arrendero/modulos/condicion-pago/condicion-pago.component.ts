import { Component, OnInit } from '@angular/core';
import { CondicionPagoService } from 'src/app/services/apis/condicion-pago.service';
import { ModalCondicionPagoService } from 'src/app/services/common/modal-condicion-pago.service';

@Component({
  selector: 'app-condicion-pago',
  templateUrl: './condicion-pago.component.html',
  styles: [
  ]
})
export class CondicionPagoComponent implements OnInit {
  

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsCondicionPago: any[] = [];
  idArrendero: number;

  constructor(
    private condicionPagoService: CondicionPagoService,
    private modalService: ModalCondicionPagoService,
  ) { }

  ngOnInit() {
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
    /*this.condicionPagoService.listarCondicionPago(this.idArrendero).subscribe((resp: any) => {
    this.lsCondicionPago = resp.aaData;
    this.llenarTabla();
  });*/
    this.lsCondicionPago = [
      {
        idCondicionPago: 1,
        precio: 250,
        tiempoMinContrato: 6,
        montoMinGarantia: 400,
        montoMaxGarantia: 2000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.2
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      }, {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      }, {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      },
      {
        idCondicionPago: 2,
        precio: 550,
        tiempoMinContrato: 12,
        montoMinGarantia: 800,
        montoMaxGarantia: 10000,
        diaMesCobro: 15,
        responsabilidadReparar: false,
        tasaRecargo: 0.5
      }
    ];
    this.llenarTabla();
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

  eliminarCondicionPago(alumno) {

  }

}
