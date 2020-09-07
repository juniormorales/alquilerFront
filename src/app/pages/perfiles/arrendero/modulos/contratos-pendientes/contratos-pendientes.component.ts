import { Component, OnInit } from '@angular/core';
import { IInquilino } from 'src/models/IInquilino';
import Swal from 'sweetalert2';
import { InquilinoService } from 'src/app/services/apis/inquilino.service';
import { ContratoService } from 'src/app/services/apis/contrato.service';
import { ModalContratoService } from 'src/app/services/common/modal-contrato.service';

@Component({
  selector: 'app-contratos-pendientes',
  templateUrl: './contratos-pendientes.component.html',
  styles: [
  ]
})
export class ContratosPendientesComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsInquilinos: IInquilino[] = [];
  idArrendero: number;

  constructor(
    private inquilinoService: InquilinoService,
    private modalContrato: ModalContratoService,
  ) { }

  ngOnInit() {
    this.idArrendero = Number.parseFloat(sessionStorage.getItem('id'));
    this.listarInquilinosSinContrato();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsInquilinos.map((prop, key) => {
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
  listarInquilinosSinContrato() {
    this.inquilinoService.listarInquilinosSinContrato(this.idArrendero).subscribe((resp: any) => {
      this.lsInquilinos = resp.aaData;
      this.llenarTabla();
    });

  }

  filterTable(event) {
    let val = event.target.value;
    this.temp = this.lsInquilinos.filter(inquilino => {
      return inquilino.arrendatario.usuario.apellidos.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    })
  }



  emitirContrato(inquilino: IInquilino) {
    this.modalContrato.modalSetFechaInicioContrato(inquilino).subscribe(resp=>{},err=>{},()=>{
      this.listarInquilinosSinContrato();
    });

  }

}
