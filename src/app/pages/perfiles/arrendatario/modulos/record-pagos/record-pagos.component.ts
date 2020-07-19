import { Component, OnInit } from '@angular/core';
import { InquilinoService } from 'src/app/services/apis/inquilino.service';
import { IInquilino } from 'src/models/IInquilino';
import { PagoService } from 'src/app/services/apis/pago.service';
import { IPago } from 'src/models/IPago';

@Component({
  selector: 'app-record-pagos',
  templateUrl: './record-pagos.component.html',
  styles: [
  ]
})
export class RecordPagosComponent implements OnInit {

  inquilino: IInquilino;
  idArrendatario: number;

  lsPagos: IPago[]= [];

  constructor(
    private inquilinoService : InquilinoService,
    private pagoService : PagoService,
  ) { }

  ngOnInit(): void {
    this.idArrendatario = Number.parseInt(sessionStorage.getItem('id'));
    this.inquilinoService.obtenerInquilinoActivo(this.idArrendatario).subscribe((resp:any)=>{
      this.inquilino = resp.defaultObj;
      this.listarPagosHechos();
    })
  }

  listarPagosHechos(){
    this.pagoService.listarPagosTotalesInquilino(this.inquilino.idInquilino).subscribe((resp:any)=>{
      this.lsPagos = resp.aaData,
      console.log(this.lsPagos)
    })
  }

}
