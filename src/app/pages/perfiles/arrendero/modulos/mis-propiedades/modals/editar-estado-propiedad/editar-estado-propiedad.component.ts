import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-estado-propiedad',
  templateUrl: './editar-estado-propiedad.component.html',
  styles: [
  ]
})
export class EditarEstadoPropiedadComponent implements OnInit {

  input_propiedad: IPropiedad;
  estadoForm: FormGroup
  dataEstado: any[] = [
    {
      id: 0,
      itemName: 'Fuera de servicio'
    },
    {
      id: 1,
      itemName: 'Disponible'
    },
    {
      id: 2,
      itemName: 'En Mantenimiento'
    },
    {
      id: 3,
      itemName: 'Ya ocupado'
    }
  ];

  settingsGeneral = {
    singleSelection: true,
    text: 'Seleccionar ...',
    enableSearchFilter: false,
    classes: 'selectpicker btn-info',
    lazyLoading: true,
    maxHeight: 200,
    autoPosition: false,
    position: 'bottom'
  }

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private propiedadService : PropiedadService,
  ) { }

  ngOnInit() {
    this.construirFormulario();
  }

  actualizar() {
    this.propiedadService.modificarPropiedad(this.construirObjeto()).subscribe((resp:any)=>{
      Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
      this.bsModalRef.hide();
    });
  }

  construirObjeto(): IPropiedad{
    var propiedad: IPropiedad = this.input_propiedad;
    propiedad.estado = this.estadoForm.get('estado').value[0].id;
    propiedad.condicionPropiedad = this.estadoForm.get('descripcion').value;
    return propiedad;
  }

  construirFormulario() {
    this.estadoForm = this.builder.group({
      descripcion: [this.input_propiedad.condicionPropiedad, Validators.required],
      estado: [[], Validators.required]
    });
    this.estadoForm.patchValue({estado:[this.dataEstado[this.input_propiedad.estado]]});
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

}
