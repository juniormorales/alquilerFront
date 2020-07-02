import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import { CondicionPagoService } from 'src/app/services/apis/condicion-pago.service';
import { ICondicionPago } from 'src/models/ICondicionPago';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iu-propiedad',
  templateUrl: './iu-propiedad.component.html'
})
export class IUPropiedadComponent implements OnInit {

  input_propiedad: IPropiedad;
  accion: String = null;
  propiedadForm: FormGroup;
  idArrendero: number;
  lsCondicionPago: ICondicionPago[] = [];
  dataCondPago: any[] = [];
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
    private propiedadService: PropiedadService,
    private condicionPagoService: CondicionPagoService,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.idArrendero = Number.parseInt(sessionStorage.getItem('id'));
    if (this.input_propiedad != null) {
      this.accion = "A";
      this.setearValores();
    }
    this.listarCondicionesPago();
  }

  construirFormulario() {
    this.propiedadForm = this.builder.group({
      alias: ['', Validators.required],
      descripcion_ge: ['', Validators.required],
      nro_hab: [0, Validators.required],
      cant_pisos: [0, Validators.required],
      tamano: [0, Validators.required],
      estado: [[], Validators.required],
      tiene_dano: [false, Validators.required],
      mascota: [false, Validators.required],
      condicion_pago: [[], Validators.required],
      descripcion_dano: [''],
    });
    this.propiedadForm.get('descripcion_dano').disable();
    this.propiedadForm.get('tiene_dano').valueChanges.subscribe(val => {
      if (val) {
        this.propiedadForm.get('descripcion_dano').enable();
      } else {
        this.propiedadForm.get('descripcion_dano').reset();
        this.propiedadForm.get('descripcion_dano').disable();
      }
    })
  }

  private setearValores(){
    this.propiedadForm.setValue({
      alias: this.input_propiedad.alias,
      descripcion_ge: this.input_propiedad.descripcionGeneral,
      nro_hab: this.input_propiedad.nroHabitaciones,
      cant_pisos: this.input_propiedad.cantidadPisos,
      tamano: this.input_propiedad.tamano,
      estado: [{id:this.input_propiedad.estado, itemName:this.dataEstado[this.input_propiedad.estado].itemName}],
      tiene_dano: this.input_propiedad.tieneDanios,
      mascota: this.input_propiedad.permiteMascotas,
      condicion_pago: [{id:this.input_propiedad.condicionPago.idCondicionPago,itemName:this.input_propiedad.condicionPago.alias}],
      descripcion_dano: this.input_propiedad.descripcionDanios
    });
    if(this.input_propiedad.tieneDanios){
      this.propiedadForm.get('descripcion_dano').enable();
    }
  }

  private construirObjeto() {
    var propiedad: IPropiedad = {
      alias: this.propiedadForm.get('alias').value,
      cantidadPisos: this.propiedadForm.get('cant_pisos').value,
      descripcionDanios: this.propiedadForm.get('descripcion_dano').value,
      descripcionGeneral: this.propiedadForm.get('descripcion_ge').value,
      estado: this.propiedadForm.get('estado').value[0].id,
      permiteMascotas: this.propiedadForm.get('mascota').value,
      nroHabitaciones: this.propiedadForm.get('nro_hab').value,
      tamano: this.propiedadForm.get('tamano').value,
      tieneDanios: this.propiedadForm.get('tiene_dano').value,
      condicionPago: {
        idCondicionPago: this.propiedadForm.get('condicion_pago').value[0].id
      },
      arrendero: {
        idArrendero: this.idArrendero
      }
    };
    return propiedad;
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  //Eventos de boton
  public crud() {
    if (this.propiedadForm.valid) {
      var propiedad = this.construirObjeto();
      if (this.accion == null) {
        console.log(propiedad)
        this.propiedadService.registrarPropiedad(propiedad).subscribe((resp: any) => {
          Swal.fire(resp.titulo, resp.mensaje, resp.tipo);
          this.bsModalRef.hide();
        });
      } else {
        propiedad.idPropiedad = this.input_propiedad.idPropiedad;
        propiedad.fechaRegistro = this.input_propiedad.fechaRegistro;
        this.propiedadService.modificarPropiedad(propiedad).subscribe((resp: any) => {
          Swal.fire(resp.titutlo, resp.mensaje, resp.tipo);
          this.bsModalRef.hide();
        });
      }
    } else {
      Swal.fire('¡ADVERTENCIA!', 'Complete todos los campos para continuar', 'warning');
    }
  }

  listarCondicionesPago() {
    this.condicionPagoService.listarCondicionPago(this.idArrendero).subscribe((resp: any) => {
      this.lsCondicionPago = resp.aaData;
      this.lsCondicionPago.forEach(element => {
        this.dataCondPago.push({ "id": element.idCondicionPago, "itemName": element.alias });
      });
    })
  }

}
