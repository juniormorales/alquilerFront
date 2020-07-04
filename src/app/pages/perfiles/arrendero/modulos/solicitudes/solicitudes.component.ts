import { Component, OnInit } from '@angular/core';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import Swal from 'sweetalert2';
import { ModalVerDetalleSolService } from 'src/app/services/common/modal-ver-detalle-sol.service';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];
  idArrendero: number;
  solicitudes: ISolicitudPropiedad[] = [];
  

  constructor(
    private modalService : ModalVerDetalleSolService,
    private solPropiedad: SolicitudPropiedadService,
  ) { }

  ngOnInit(): void {
    this.idArrendero = Number.parseInt(sessionStorage.getItem('id'));
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
    this.solPropiedad.listarSolicitudesEnTramiteParaArrendero(this.idArrendero).subscribe((resp:any)=>{
      this.solicitudes = resp.aaData;
      this.llenarTabla();
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  verDetalles(solicitud:ISolicitudPropiedad) {
    this.modalService.modalVerDetalleSolicitante(solicitud).subscribe(resp => {}, err => {}, () => {
    });
  }

  aceptarSolicitud(solicitud:ISolicitudPropiedad){
    Swal.fire({
      title: 'Aceptar Solicitud Inquilino',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'Una vez que acepte, le llegara la notificacion al inquilino para que confirme la aprobacion',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar inquilino',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        solicitud.estado = 1;
      this.solPropiedad.editarSolicitudArrendatario(solicitud).subscribe((resp:any)=>{
        Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
        this.listarSolicitantes();
      })
      }
    })
  }

  rechazarSolicitud(solicitud){
   this.modalService.modalEscribirRechazo(solicitud).subscribe(resp=>{},err=>{},()=>{
     this.listarSolicitantes();
   })
  }
}
