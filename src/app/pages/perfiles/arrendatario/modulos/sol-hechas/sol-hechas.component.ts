import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { ModalVerDetalleSolService } from 'src/app/services/common/modal-ver-detalle-sol.service';

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
     private modalService: ModalVerDetalleSolService,
   ) { }
 
   ngOnInit(): void {
     this.idArrendatario = Number.parseInt(sessionStorage.getItem('id'));
     this.listarSolicitudes();
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
 
    listarSolicitudes() {
     this.solPropiedad.listarSolicitudesParaArrendatario(this.idArrendatario).subscribe((resp:any)=>{
       this.solicitudes = resp.aaData;
       this.llenarTabla();
     })
   }
 
   entriesChange($event) {
     this.entries = $event.target.value;
   }

   reformularSolicitud(sol: ISolicitudPropiedad){
      this.modalService.modalEditarSolicitud(sol).subscribe(resp=>{},err=>{},()=>{
        this.listarSolicitudes();
      })
   }

   cancelarSol(sol:ISolicitudPropiedad){
    Swal.fire({
      title: 'Cancelar Solicitud Propiedad',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: '¿Estas seguro de cancelar su solicitud?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Cancelar!',
      cancelButtonText: 'No, Salir!',
    }).then((result) => {
      if (result.value) {
        sol.estado = 4;
        this.solPropiedad.editarSolicitudArrendatario(sol).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.listarSolicitudes();
        })
      }
    })
   }

}
