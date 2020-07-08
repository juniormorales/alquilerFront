import { Component, OnInit } from '@angular/core';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import Swal from 'sweetalert2';
import { ModalVerDetalleSolService } from 'src/app/services/common/modal-ver-detalle-sol.service';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';

import { ModalVisualizarReciboService } from './../../../../../services/common/modal-visualizar-recibo.service';


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
  solicitudes: ISolicitudPropiedad[] = [];
  
 
  constructor( private modalService : ModalVisualizarReciboService,
    private solPropiedad: SolicitudPropiedadService,) { }

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
  /*
   listarSolicitantes() {
    this.solPropiedad.listarSolicitudesEnTramiteParaArrendero(this.idArrendero).subscribe((resp:any)=>{
      this.solicitudes = resp.aaData;
      this.llenarTabla();
    })
  }
*/
listarSolicitantes() {

  /*
  export interface ISolicitudPropiedad {
    idSolicitudPropiedad?: number;
    fechaSolicitud?: Date;
    estado?: number;
    tiempoArrendamiento?: number;
    nroHuespedPropuesto?: number;
    descripcionRechazo?: string;
    arrendatario?: IArrendatario;
    propiedad?: IPropiedad;
    arrendero?: IArrendero;
}
    export interface IArrendatario {

    idArrendatario?:number;
    direccionTemporal?:string;
    nroPartidaRegistral?: number;
    usuario?: IUsuario;
}

export interface IPropiedad {
    idPropiedad?: number;
    alias?:string;
    fechaRegistro?: Date;
    descripcionGeneral?: string;
    descripcionDanios?: string;
    nroHabitaciones?: number;
    cantidadPisos?: number;
    tamano?: number;
    permiteMascotas?: boolean;
    condicionPropiedad?: string;
    estado?: number;
    condicionPago?: ICondicionPago;
    arrendero?: IArrendero;
    tieneDanios?:boolean;

}
export interface IUsuario {
    idUsuario?:number;
    username?: string;
    password?: string;
    email?: string;
    dni?: string;
    nombres?: string;
    apellidos?:string;
    telefono?:string;
    nroCel?:string;
    tipoUsuario?:string;
    fechaNacimiento?:Date;
    estado?:boolean;
    perfil?:any;
    fechaCreacion?:Date;
}
export interface IArrendero {
    idArrendero?: number;
    direccionActual?: string;
    nroPartidaRegistral?: number;
    departamento?:any;
    provincia?:any;
    distrito?:any;
    usuario?: IUsuario;

}
*/
  this.solicitudes = [
    //recibo 1
  {
    arrendatario:
    {
      usuario: 
      {
        dni: '18181919',
        nombres: 'Jhon Hairo',
        apellidos:'Valasquez',
      },
    },
    propiedad: 
    {
      alias:'Propiedad del Callao',
    	descripcionGeneral: 'assets/img/recibos/r1.jpg',
    },
  
  },
   //recibo 2
  {
    arrendatario:
    {
      usuario: 
      {
        dni: '20202020',
        nombres: 'Juan Luis',
        apellidos:'Garcia Perez',
      },
    },
    propiedad: 
    {
      alias:'Propiedad de Lima',
    	descripcionGeneral: 'assets/img/recibos/r1.jpg',
    },
    
  },

  ];

    this.llenarTabla();
  }





  entriesChange($event) {
    this.entries = $event.target.value;
  }


  verDetalles(solicitud:ISolicitudPropiedad) {
    this.modalService.modalVerDetalleSolicitante(solicitud).subscribe(resp => {}, err => {}, () => {
    });
  }
/*
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

  */
}
