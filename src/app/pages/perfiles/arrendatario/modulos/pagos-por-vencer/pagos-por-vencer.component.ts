import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IInquilino } from 'src/models/IInquilino';
import { InquilinoService } from 'src/app/services/apis/inquilino.service';
import { RentaService } from 'src/app/services/apis/renta.service';
import { IRenta } from 'src/models/IRenta';
import { ModalVisualizarReciboService } from 'src/app/services/common/modal-visualizar-recibo.service';

@Component({
  selector: 'app-pagos-por-vencer',
  templateUrl: './pagos-por-vencer.component.html'
})
export class PagosPorVencerComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  modalRef: BsModalRef;
  inquilino: IInquilino;
  idArrendatario: number;

  lsRentas: IRenta[] = [];

  constructor(
    private modalBoleta : ModalVisualizarReciboService,
    private inquilinoService : InquilinoService,
    private rentaService: RentaService,
    ) { }

  ngOnInit(): void {
    this.idArrendatario = Number.parseInt(sessionStorage.getItem('id'));
    this.inquilinoService.obtenerInquilinoActivo(this.idArrendatario).subscribe((resp:any)=>{
      if(resp.defaultObj!=null){
        this.inquilino = resp.defaultObj;
      this.listarRentasPendientes();
      }
    })
  }

  registrarPago(renta: IRenta){
    if(renta.envioPago != 0){
      this.modalBoleta.modalRegistrarPago(renta).subscribe(resp=>{},err=>{},()=>{
        this.listarRentasPendientes();
      })
    }
  }

  listarRentasPendientes(){
    this.rentaService.listarRentasPendientes(this.inquilino).subscribe((resp:any)=>{
      this.lsRentas = resp.aaData;
      this.llenarTabla();
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

   //Metodos Para NgxTable
   llenarTabla() {
    this.temp = this.lsRentas.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
      
    });
  }

}
