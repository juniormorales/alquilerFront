import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IPropiedad } from 'src/models/IPropiedad';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-proponer-solicitud-propiedad',
  templateUrl: './proponer-solicitud-propiedad.component.html',
})
export class ProponerSolicitudPropiedadComponent implements OnInit {

  input_propiedad: IPropiedad;
  solForm : FormGroup;
  id_arrendatario: number;

  constructor(
    private builder: FormBuilder,
    private solicitudPropiedadService: SolicitudPropiedadService,
    private bsModalRef : BsModalRef,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.id_arrendatario = Number.parseInt(sessionStorage.getItem('id'));
    this.construirFormulario();
  }

  private construirFormulario(){
    this.solForm = this.builder.group({
      tiempo: ['',Validators.required],
      nrohuesp: ['',Validators.required],  
    });
  }

  private armarSolicitud(){
    var solicitud: ISolicitudPropiedad = {
      arrendatario:{
        idArrendatario: this.id_arrendatario
      },
      arrendero:{
        idArrendero: this.input_propiedad.arrendero.idArrendero,
      },
      propiedad: {
        idPropiedad: this.input_propiedad.idPropiedad,
      },
      estado: 2,
      nroHuespedPropuesto: this.solForm.get('nrohuesp').value,
      tiempoArrendamiento: this.solForm.get('tiempo').value
    }
    return solicitud;
  }

  solicitar(){
    Swal.fire({
      title: 'Enviar Solicitud Propiedad',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: '¿Estas seguro de enviar la solicitud?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Solicitar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.solicitudPropiedadService.registrarSolicitudPropiedad(this.armarSolicitud()).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.bsModalRef.hide();
        });
      }
    })
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }
}
