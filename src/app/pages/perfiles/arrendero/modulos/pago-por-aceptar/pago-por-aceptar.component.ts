import { Component, OnInit } from '@angular/core';

//katriel
import { ModalVisualizarReciboService } from './../../../../../services/common/modal-visualizar-recibo.service';
import { IPago } from '../../../../../../models/IPago';
//

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
 
  //katriel
  pagos: IPago[] = [];
  //

  constructor( private modalService : ModalVisualizarReciboService
   /*,private solPropiedad: SolicitudPropiedadService,*/) { }

  ngOnInit(): void {
    this.idArrendero = Number.parseInt(sessionStorage.getItem('id'));
    //this.listarSolicitantes();
    this.pagosPorAceptar();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.pagos.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
      
    });
  }
  //LLAMA AL SERVICIO
  /*
   listarSolicitantes() {
    this.solPropiedad.listarSolicitudesEnTramiteParaArrendero(this.idArrendero).subscribe((resp:any)=>{
      this.solicitudes = resp.aaData;
      this.llenarTabla();
    })
  }
*/

// DATOS FICTICIOS DE PAGO AUN NO ACEPTADOS
pagosPorAceptar() {

  this.pagos = [
    //recibo 1
    { 
        idPago: 1,
        monto: 500,
        urlVoucher:'assets/img/recibos/r1.jpg',
        estado:false,//SI SE ACPETA DEBE CAMBIAR A TRUE
        renta:{
          importeAtrasado:500,
            inquilino:
              {
                propiedad: {
                  alias:'Propiedad del Callao',

                  
                },
                arrendatario: {
                  usuario:{
                    dni: '18181818',
                    nombres: 'Jose Luis',
                    apellidos:'Hernandez Ramirez',

                  }
                },
                        
              },
          },
      
    },
    //recibo 2
    { 
      idPago: 2,
      monto: 680,
      urlVoucher:'assets/img/recibos/r1.jpg',
      estado:false,//SI SE ACPETA DEBE CAMBIAR A TRUE
      renta:{
        importeAtrasado:680,
          inquilino:
            {
              propiedad: {
                alias:'Propiedad de Lima',

                
              },
              arrendatario: {
                usuario:{
                  dni: '20202020',
                  nombres: 'Jhon Hairo',
                  apellidos:'Velasquez',

                }
              },
                      
            },
        },
    },
  ];

  this.llenarTabla();
}



  entriesChange($event) {
    this.entries = $event.target.value;
  }


  verRecibo(pago:IPago) {
    this.modalService.modalVerRecibo(pago).subscribe(resp => {}, err => {}, () => {
    });
  }

}
