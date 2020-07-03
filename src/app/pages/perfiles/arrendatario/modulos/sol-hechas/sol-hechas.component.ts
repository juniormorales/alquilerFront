import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';

@Component({
  selector: 'app-sol-hechas',
  templateUrl: './sol-hechas.component.html',
  styles: [
  ]
})
export class SolHechasComponent implements OnInit {

   //Variables NgxTable
   entries: number = 5;
   temp = [];
   idArrendatario: number;
   solicitudes: ISolicitudPropiedad[] = [];
   
 
   constructor(
     private solPropiedad: SolicitudPropiedadService,
   ) { }
 
   ngOnInit(): void {
     this.idArrendatario = Number.parseInt(sessionStorage.getItem('id'));
     this.listarSolicitantes();
   }
 
 
   //Metodos Para NgxTable
   llenarTabla() {
     this.temp = this.solicitudes.map((prop, key) => {
       return {
         ...prop,
         id: key
       };
       
     });
   }
 
    listarSolicitantes() {
     this.solPropiedad.listarSolicitudesParaArrendatario(this.idArrendatario).subscribe((resp:any)=>{
       this.solicitudes = resp.aaData;
       this.llenarTabla();
     })
   }
 
   entriesChange($event) {
     this.entries = $event.target.value;
   }

}
