import { Component, OnInit } from '@angular/core';
import { InquilinoService } from 'src/app/services/apis/inquilino.service';
import { IInquilino } from 'src/models/IInquilino';
import { PagoService } from 'src/app/services/apis/pago.service';
import { IPago } from 'src/models/IPago';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-record-pagos',
  templateUrl: './record-pagos.component.html',
})
export class RecordPagosComponent implements OnInit {

  inquilino: IInquilino;
  idArrendatario: number;
  mes: string[] = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SET","OCT","NOV","DIC"]
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
      this.lsPagos = resp.aaData
    })
  }

  descargarBoleta(pago: IPago){
    this.pagoService.descargarBoleta(pago.idPago).subscribe((resp:any)=>{
      var reporte: any = resp;
      var file = new Blob([reporte], { type: 'application/pdf' });
      var nombres_sinesp = pago.inquilino.arrendatario.usuario.nombres.replace(" ","");
      var ap_sinesp = pago.inquilino.arrendatario.usuario.apellidos.replace(" ","");
      pago.renta.fechaIniRenta = new Date(pago.renta.fechaIniRenta)
      pago.renta.fechaFinRenta = new Date( pago.renta.fechaFinRenta)
      var desc_ini_ano: String = (pago.renta.fechaIniRenta.getFullYear()).toString();
      var desc_ini_mes: String = this.mes[pago.renta.fechaIniRenta.getMonth()]
      var desc_fin_ano: String = (pago.renta.fechaFinRenta.getFullYear() ).toString();
      var desc_fin_mes: String = this.mes[pago.renta.fechaFinRenta.getMonth()]

      saveAs(file, `B-${pago.nro_boleta}-${nombres_sinesp}_${ap_sinesp}_${desc_ini_mes}-${desc_ini_ano}_${desc_fin_mes}-${desc_fin_ano}.pdf`);
    })
  }

}
