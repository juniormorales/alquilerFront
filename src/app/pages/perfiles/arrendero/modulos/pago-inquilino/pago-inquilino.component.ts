import { Component, OnInit } from '@angular/core';
import { IPago } from 'src/models/IPago';
import { PagoService } from 'src/app/services/apis/pago.service';

@Component({
  selector: 'app-pago-inquilino',
  templateUrl: './pago-inquilino.component.html',
  styles: [
  ]
})
export class PagoInquilinoComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];
  lsPagos: IPago [] = [];
  idArrendero: number;

  constructor(
    private pagoService: PagoService,
  ) { }

  ngOnInit(): void {
    this.idArrendero = Number.parseFloat(sessionStorage.getItem('id'));
    this.listarPagosAceptados();
  }

  listarPagosAceptados(){
    this.pagoService.listarPagosArrenderoAceptados(this.idArrendero).subscribe((resp:any)=>{
      this.lsPagos = resp.aaData;
       this.llenarTabla();
    })
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
  
  entriesChange($event) {
    this.entries = $event.target.value;
  }

  verReciboArrendamiento(pago: IPago){

  }

}
