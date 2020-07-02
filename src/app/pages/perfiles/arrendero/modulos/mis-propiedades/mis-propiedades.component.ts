import { Component, OnInit } from '@angular/core';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import { IPropiedad } from 'src/models/IPropiedad';
import { ModalPropiedadService } from 'src/app/services/common/modal-propiedad.service';

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
    private propiedadService: PropiedadService,
    private modalService: ModalPropiedadService,
  ) { }

  ngOnInit() {
    this.idArrendero = Number.parseFloat(sessionStorage.getItem('id'));
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
  listarPropiedades() {

    this.propiedadService.listarPropiedades(this.idArrendero).subscribe((resp: any) => {
      this.lsPropiedad = resp.aaData;
      this.llenarTabla();
    });

  }

  filterTable(event) {
    let val = event.target.value;
    this.temp = this.lsPropiedad.filter(propiedad => {
      return propiedad.alias.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
    })
  }


  //Modal
  private openModal(obj) {
    this.modalService.modalUIPropiedad(obj).subscribe(resp => { }, err => { }, () => {
      this.listarPropiedades();
    });
  }

  nuevaPropiedad() {
    this.openModal(null);
  }

  editarPropiedad(propiedad) {
    this.openModal(propiedad);
  }

  editarEstadoPropiedad(propiedad) {
    this.modalService.modalEditarEstadoPropiedad(propiedad).subscribe(resp => { }, err => { }, () => {
      this.listarPropiedades();
    });
  }

  eliminarPropiedad(propiedad) {

  }

  subirImagen(propiedad) {
    this.modalService.modalSubirImagen(propiedad).subscribe(resp => { }, err => { }, () => {
      this.listarPropiedades();
    });
  }

  eliminarImagenes(propiedad) {
    this.modalService.modalEliminarImagen(propiedad).subscribe(resp => { }, err => { }, () => {
      this.listarPropiedades();
    });
  }

}
