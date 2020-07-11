import { Component, OnInit } from '@angular/core';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import { IUbicacionMaps } from 'src/models/IUbicacionMaps';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmar-propiedades',
  templateUrl: './confirmar-propiedades.component.html',
  styles: [
  ]
})
export class ConfirmarPropiedadesComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsMaps: IUbicacionMaps[] = [];

  constructor(
    private propiedadService: PropiedadService,
  ) { }

  ngOnInit(): void {
    this.listarPropiedades();
  }


  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsMaps.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

  listarPropiedades() {
    this.propiedadService.listarPropiedadPorAceptar().subscribe((resp: any) => {
      this.lsMaps = resp.aaData;
      this.llenarTabla();
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  aceptarPropiedad(ubicacion: IUbicacionMaps){
    Swal.fire({
      title: 'Aceptar Propiedad',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'Al aceptar esta propiedad usted reconoce que los datos ingresados coinciden con los registrados en SUNARP, ¿Desea Continuar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aceptar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        ubicacion.propiedad.confirmado = true;
        ubicacion.propiedad.rechazado = false;
        this.propiedadService.modificarPropiedad(ubicacion.propiedad).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,"Se ha aceptado la propiedad correctamente",resp.tipo);
          this.listarPropiedades();
        })
      }
    })
  }

  rechazarPropiedad(ubicacion: IUbicacionMaps){
    Swal.fire({
      title: 'Rechazar Propiedad',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      icon: 'question',
      text: 'Al rechazar esta propiedad usted reconoce que los datos ingresados no coinciden con los registrados en SUNARP, ¿Desea Continuar?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        ubicacion.propiedad.rechazado = true;
        this.propiedadService.modificarPropiedad(ubicacion.propiedad).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,"Se ha rechazado la propiedad correctamente",resp.tipo);
          this.listarPropiedades();
        })
      }
    })
  }

}
