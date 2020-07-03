import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IInquilino } from 'src/models/IInquilino';
import { InquilinoService } from 'src/app/services/apis/inquilino.service';

@Component({
  selector: 'app-gestion-inquilino',
  templateUrl: './gestion-inquilino.component.html',
  styles: [
  ]
})
export class GestionInquilinoComponent implements OnInit {

   //Variables NgxTable
   entries: number = 5;
   temp = [];
 
   lsInquilinos: IInquilino[] = [];
   idArrendero: number;
 
   constructor(
     private inquilinoService: InquilinoService
   ) { }
 
   ngOnInit() {
     this.idArrendero = Number.parseFloat(sessionStorage.getItem('id'));
     this.listarInquilinos();
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
   listarInquilinos() {
     this.inquilinoService.listarInquilinos(this.idArrendero).subscribe((resp: any) => {
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
 

 
   darBajaInquilino(inquilino: IInquilino) {
     Swal.fire({
       title: 'Dar de Baja a Inquilino',
       showClass: {
         popup: 'animate__animated animate__fadeInDown'
       },
       hideClass: {
         popup: 'animate__animated animate__fadeOutUp'
       },
       icon: 'question',
       text: '¿Estas seguro de quitar de la lista de inquilinos activos?',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, dar baja!',
       cancelButtonText: 'Cancelar',
     }).then((result) => {
       if (result.value) {
         this.inquilinoService.darBajaInquilino(inquilino).subscribe((resp:any)=>{
           if(resp.estado){
            this.listarInquilinos();
           }
           Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
         })
       }
     });
   }

}
