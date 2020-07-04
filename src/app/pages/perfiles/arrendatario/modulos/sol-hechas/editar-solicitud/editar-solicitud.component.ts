import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SolicitudPropiedadService } from 'src/app/services/apis/solicitud-propiedad.service';

@Component({
  selector: 'app-editar-solicitud',
  templateUrl: './editar-solicitud.component.html',
  styles: [
  ]
})
export class EditarSolicitudComponent implements OnInit {

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
      rechazo: [this.input_sol_prop.descripcionRechazo],
      tiempo_arrend: [this.input_sol_prop.tiempoArrendamiento,Validators.required],
      nro_huesp: [this.input_sol_prop.nroHuespedPropuesto,Validators.required]
    });
  }

  construirObjeto(){
    var sol: ISolicitudPropiedad = {
      idSolicitudPropiedad: this.input_sol_prop.idSolicitudPropiedad,
      arrendatario: this.input_sol_prop.arrendatario,
      descripcionRechazo: this.input_sol_prop.descripcionRechazo,
      estado: 2,
      fechaSolicitud: new Date(),
      nroHuespedPropuesto: this.solForm.get('nro_huesp').value,
      tiempoArrendamiento: this.solForm.get('tiempo_arrend').value,
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
      this.solicitudService.editarSolicitudArrendatario(this.construirObjeto()).subscribe((resp:any)=>{
        Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
        this.bsModalRef.hide();
      })
    }else{
      Swal.fire('¡ADVERTENCIA!','Complete todos los campos para continuar','warning');
    }
  }
}
