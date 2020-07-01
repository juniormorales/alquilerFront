import { Component, OnInit } from '@angular/core';
import { ArrendatarioService } from 'src/app/services/apis/arrendatario.service';
import { IArrendatario } from 'src/models/IArrendatario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
})
export class SolicitudesPendientesComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsSolicitante: IArrendatario[] = [];

  constructor(
    private arrendatarioService: ArrendatarioService,
  ) { }

  ngOnInit(): void {
    this.listarSolicitantes();
  }


  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsSolicitante.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

  listarSolicitantes() {
    this.arrendatarioService.listarCuentasDesactivadas().subscribe((resp:any)=>{
      this.lsSolicitante = resp.aaData;
      this.llenarTabla();
    })
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
  */

  aceptarCuenta(user:IArrendatario) {
    Swal.fire({
      title: 'Activar Cuenta',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: '¿Estas seguro de habilitar esta cuenta para su uso?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, activar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.arrendatarioService.activarCuenta(user.usuario).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.listarSolicitantes();
        })
      }
    })
  }

  rechazarCuenta(user:IArrendatario) {
    Swal.fire({
      title: 'Inhabilitar Cuenta',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: '¿Estas seguro de inhabilitar esta cuenta para su uso?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Rechazar Solicitud',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.arrendatarioService.desactivarCuenta(user.usuario).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.listarSolicitantes();
        })
      }
    })
  }

}
