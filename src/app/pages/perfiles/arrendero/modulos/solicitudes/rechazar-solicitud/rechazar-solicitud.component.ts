import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';

@Component({
  selector: 'app-rechazar-solicitud',
  templateUrl: './rechazar-solicitud.component.html',
  styles: [
  ]
})
export class RechazarSolicitudComponent implements OnInit {

  input_sol_prop: ISolicitudPropiedad;
  solForm: FormGroup;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private solicitudService : SolicitudPropiedadService,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  construirFormulario(){
    this.solForm = this.builder.group({
      rechazo: [this.input_sol_prop.descripcionRechazo,Validators.required],
    });
  }

  construirObjeto(){
    var sol: ISolicitudPropiedad = {
      idSolicitudPropiedad: this.input_sol_prop.idSolicitudPropiedad,
      arrendatario: this.input_sol_prop.arrendatario,
      descripcionRechazo: this.solForm.get('rechazo').value,
      estado: 0,
      fechaSolicitud: new Date(),
      nroHuespedPropuesto: this.input_sol_prop.nroHuespedPropuesto,
      tiempoArrendamiento: this.input_sol_prop.tiempoArrendamiento,
      propiedad: this.input_sol_prop.propiedad,
      arrendero: this.input_sol_prop.arrendero
    }
    return sol;
  }

   //Metodos modal
   public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  enviar(){
    if(this.solForm.valid){
      Swal.fire({
        title: 'Rechazar Solicitud Inquilino',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        icon: 'question',
        text: 'Esta a punto de rechazar esta solicitud, estas seguro?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Rechazar solicitud',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          
          this.solicitudService.editarSolicitudArrendatario(this.construirObjeto()).subscribe((resp:any)=>{
            Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
            this.bsModalRef.hide();
          })
        }
      })
    }else{
      Swal.fire('¡ADVERTENCIA!','Complete todos los campos para continuar','warning');
    }
  }
}
