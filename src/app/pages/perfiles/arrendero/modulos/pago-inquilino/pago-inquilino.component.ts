import { Component, OnInit } from '@angular/core';
import { IPago } from 'src/models/IPago';
import { PagoService } from 'src/app/services/apis/pago.service';
import { saveAs } from 'file-saver';


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
  mes: string[] = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SET","OCT","NOV","DIC"]

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
