import { Component, OnInit } from '@angular/core';
import { ContratoService } from 'src/app/services/apis/contrato.service';
import { IContrato } from 'src/models/IContrato';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styles: [
  ]
})
export class ContratosComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  idArrendero: number;
  lsContratos: IContrato[] = [];

  constructor(
    private contratoService: ContratoService
  ) { }

  ngOnInit(): void {
    this.idArrendero = Number.parseInt(sessionStorage.getItem("id"));
    this.listarContratos();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsContratos.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  listarContratos() {
    this.contratoService.listarContratosPorArrendero(this.idArrendero).subscribe((resp: any) => {
      this.lsContratos = resp.aaData;
      this.llenarTabla();
    })
  }

  descargarContrato(contrato:IContrato){
    this.contratoService.descargarContrato(contrato.idContrato).subscribe((resp:any)=>{
      var file_contrato: any = resp;
      var file = new Blob([file_contrato], { type: 'application/msword' });
      var nombres_sinesp = contrato.inquilino.arrendatario.usuario.nombres.replace(" ","");
      var ap_sinesp = contrato.inquilino.arrendatario.usuario.apellidos.replace(" ","");
      saveAs(file, `Contrato_${nombres_sinesp}_${ap_sinesp}.docx`);
    })
  }

}
