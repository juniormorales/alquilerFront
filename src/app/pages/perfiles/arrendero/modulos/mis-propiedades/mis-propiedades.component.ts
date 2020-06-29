import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/common/modal.service';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import { IPropiedad } from 'src/models/IPropiedad';

@Component({
  selector: 'app-mis-propiedades',
  templateUrl: './mis-propiedades.component.html'
})
export class MisPropiedadesComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsPropiedad: IPropiedad[] = [];
  idArrendero: number;

  constructor(
    private propiedadService : PropiedadService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.listarPropiedades();
  }

  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsPropiedad.map((prop, key) => {
      return {
        ...prop,
        id: key
      };
    });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  //WEB SERVICES
  listarPropiedades() {/*
    this.propiedadService.listarPropiedades(this.idArrendero).subscribe((resp: any) => {
    this.lsCondicionPago = resp.aaData;
    this.llenarTabla();
  });*/
    this.lsPropiedad = [
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 3,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 2,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 1,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 1,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 0,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 3,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 2,
        condicionPago:{
          precio: 250
        }
      },
      {
        idPropiedad: 1,
        alias: 'Casa de verano Las Lomas',
        fechaRegistro: new Date(),
        descripcionGeneral: 'Esta es una descripcion',
        descripcionDanios: 'No hay registro de daños',
        nroHabitaciones: 5,
        cantidadPisos: 2,
        tamano: 200,
        permiteMascotas: true,
        estado: 1,
        condicionPago:{
          precio: 250
        }
      },
      
      
    ]
    this.llenarTabla();
  }

  filterTable(event) {
    let val = event.target.value;
    this.temp = this.lsPropiedad.filter( propiedad => {
      return propiedad.alias.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    })
  }


  //Modal
  private openModal(obj) {
    this.modalService.modalUIPropiedad(obj).subscribe(resp => {}, err => {}, () => {
      this.listarPropiedades();
    });
  }

  nuevaPropiedad(){
    var obj = null;
    this.openModal(obj);
  }

  editarPropiedad(propiedad) {
    var obj = Object.assign({},propiedad);
    obj.accion = "A";
    this.openModal(obj);
  }

  editarEstadoPropiedad(propiedad){
    this.modalService.modalEditarEstadoPropiedad(propiedad).subscribe(resp => {}, err => {}, () => {
      this.listarPropiedades();
    });
  }

  eliminarPropiedad(propiedad) {

  }

  subirImagen(propiedad){

  }

}
