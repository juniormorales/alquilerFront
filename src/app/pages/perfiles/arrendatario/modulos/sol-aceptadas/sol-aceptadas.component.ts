import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';

@Component({
  selector: 'app-sol-aceptadas',
  templateUrl: './sol-aceptadas.component.html',
  styles: [
  ]
})
export class SolAceptadasComponent implements OnInit {

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
     this.listarSolicitudesAceptadas();
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
 
    listarSolicitudesAceptadas() {
     this.solPropiedad.listarSolAceptadasArrendatario(this.idArrendatario).subscribe((resp:any)=>{
       this.solicitudes = resp.aaData;
       this.llenarTabla();
     })
   }
 
   entriesChange($event) {
     this.entries = $event.target.value;
   }

   verDetallePropiedad(sol: ISolicitudPropiedad){
      /*this.modalService.modalEditarSolicitud(sol).subscribe(resp=>{},err=>{},()=>{
        this.listarSolicitudes();
      })*/
   }

   aceptar(sol:ISolicitudPropiedad){
    Swal.fire({
      title: 'Aceptar Aprobacion de Solicitud',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'Una vez que aceptes quedaras registrado en el sistema de tu arrendero como inquilino inactivo hasta realizar el contrato',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar Aprobacion',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        sol.estado = 3;
        this.solPropiedad.editarSolicitudArrendatario(sol).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.listarSolicitudesAceptadas();
        })
      }
    })
   
   }

   rechazar(sol:ISolicitudPropiedad){
    Swal.fire({
      title: 'Rechazar Aprobacion para Propiedad',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: '¿Estas seguro de rechazar la aprobacion? Su solicitud quedará cancelada',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Rechazar!',
      cancelButtonText: 'No, Salir!',
    }).then((result) => {
      if (result.value) {
        sol.estado = 4;
        this.solPropiedad.editarSolicitudArrendatario(sol).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.listarSolicitudesAceptadas();
        })
      }
    })
   }
}
