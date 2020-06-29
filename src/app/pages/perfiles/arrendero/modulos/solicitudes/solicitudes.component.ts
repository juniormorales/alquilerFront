import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styles: [
  ]
})
export class SolicitudesComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  solicitantes: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.listarSolicitantes();
  }


  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.solicitantes.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
      
    });
  }

   listarSolicitantes() {
  
    this.solicitantes = [
      {
        fecha: '28/06/2020',
        solicitante: 'Juan Hairo',
        propiedad: 1818,
        estado: 'desocupado',
       
      },
      {
        fecha:'29/06/2020',
        solicitante: 'Juan Miguel',
        propiedad: 1818,
        estado: 'desocupado',
       
      },
      {
        fecha: '28/06/2020',
        solicitante: 'Luis Miguel',
        propiedad: 1819,
        estado: 'contrato',
       
      },
      {
        fecha:'29/06/2020',
        solicitante: 'Jhon Lenon',
        propiedad: 1820,
        estado: 'desocupado',
       
      },
      {
        fecha: '28/06/2020',
        solicitante: 'Britny Spyers',
        propiedad: 1820,
        estado: 'desocupado',
       
      },
      {
        fecha:'29/06/2020',
        solicitante: 'Luis Garcia',
        propiedad: 1821,
        estado: 'desocupado',
       
      }
    ];
      this.llenarTabla();
    }

  entriesChange($event) {
    this.entries = $event.target.value;
  }
/*
   //Modal
   private openModal(obj) {
    this.modalService.modalNuevoCondicionPago(obj).subscribe(resp => {}, err => {}, () => {
      this.listarCondicionPago();
    });
  }


  Ver(condicion) {
    var obj = Object.assign({},condicion);
    obj.accion = "A";
    this.openModal(obj);
  }
*/

Ver(condicion) {}
}
