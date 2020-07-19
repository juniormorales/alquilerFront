import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import { CondicionPagoService } from 'src/app/services/apis/condicion-pago.service';
import { ICondicionPago } from 'src/models/ICondicionPago';
import Swal from 'sweetalert2';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IUbicacionMaps } from 'src/models/IUbicacionMaps';
import { MapsService } from 'src/app/services/apis/maps.service';
import { add } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-iu-propiedad',
  templateUrl: './iu-propiedad.component.html'
})
export class IUPropiedadComponent implements OnInit {

  @ViewChild('staticTabs', { static: true }) staticTabs: TabsetComponent;
  
  input_propiedad: IPropiedad;
  ubicacion_map: IUbicacionMaps;
  address: string = '';
  accion: String = null;
  propiedadForm: FormGroup;
  confirmado: boolean;
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
    maxHeight: 150,
    autoPosition: false,
    position: 'bottom'
  }

  maps: ISolicitudPropiedad;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private propiedadService: PropiedadService,
    private condicionPagoService: CondicionPagoService,
    private mapsService: MapsService,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.idArrendero = Number.parseInt(sessionStorage.getItem('id'));
    if (this.input_propiedad != null) {
      this.setearValores();
      this.accion = "A";
      this.staticTabs.tabs[0].disabled = true;
      this.staticTabs.tabs[1].active = true;
      this.confirmado = true;
    }else{
      this.staticTabs.tabs[1].disabled = true;
      this.confirmado = false;
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
      partida: ['', Validators.required],
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

  private setearValores() {
    this.address = this.input_propiedad.direccion;
    this.propiedadForm.setValue({
      alias: this.input_propiedad.alias,
      descripcion_ge: this.input_propiedad.descripcionGeneral,
      nro_hab: this.input_propiedad.nroHabitaciones,
      cant_pisos: this.input_propiedad.cantidadPisos,
      tamano: this.input_propiedad.tamano,
      estado: [{ id: this.input_propiedad.estado, itemName: this.dataEstado[this.input_propiedad.estado].itemName }],
      tiene_dano: this.input_propiedad.tieneDanios,
      mascota: this.input_propiedad.permiteMascotas,
      condicion_pago: [{ id: this.input_propiedad.condicionPago.idCondicionPago, itemName: this.input_propiedad.condicionPago.alias }],
      descripcion_dano: this.input_propiedad.descripcionDanios,
      partida: this.input_propiedad.nroPartida
    });
    if (this.input_propiedad.tieneDanios) {
      this.propiedadForm.get('descripcion_dano').enable();
    };
    this.propiedadForm.get('partida').disable();
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
      nroPartida: this.propiedadForm.get('partida').value,
      confirmado: this.confirmado,
      rechazado: false,
      condicionPago: {
        idCondicionPago: this.propiedadForm.get('condicion_pago').value[0].id
      },
      arrendero: {
        idArrendero: this.idArrendero
      }
    };
    propiedad.direccion = this.address;
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
        this.propiedadService.registrarPropiedad(propiedad).subscribe((resp: any) => {
          this.ubicacion_map.propiedad = {
            idPropiedad: resp.id
          }
          this.mapsService.registrarPropiedad(this.ubicacion_map).subscribe((ub)=>{
            Swal.fire(resp.titulo, resp.mensaje, resp.tipo);
            this.bsModalRef.hide();
          })
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

  recibirMark(event) {
    this.staticTabs.tabs[1].disabled = false;
    this.staticTabs.tabs[0].disabled = true;
    this.staticTabs.tabs[0].active = false;
    this.staticTabs.tabs[1].active = true;
    this.address = event.address;
    this.ubicacion_map = {
      descripcionDireccion: event.address,
      latitud: event.position.lat,
      longitud: event.position.lng
    }
  }

}
