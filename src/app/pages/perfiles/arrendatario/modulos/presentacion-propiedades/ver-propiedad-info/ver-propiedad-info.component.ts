import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselImages } from 'src/models/ICarouselImages';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';

@Component({
  selector: 'app-ver-propiedad-info',
  templateUrl: './ver-propiedad-info.component.html'
})
export class VerPropiedadInfoComponent implements OnInit {

  input_propiedad_map: any;
  lsImagenes: any[] = [];

  //Variables de paginacion
  p: number = 1;

  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef,
    private propiedadService : PropiedadService,
  ) { }

  ngOnInit(): void {
    this.listarImagenes();
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  public solicitar() {

  }

  listarImagenes() {
    this.propiedadService.listarImagenes(this.input_propiedad_map.propiedad.idPropiedad).subscribe((resp: any) => {
      this.lsImagenes = resp.aaData;
    })
  }

}
