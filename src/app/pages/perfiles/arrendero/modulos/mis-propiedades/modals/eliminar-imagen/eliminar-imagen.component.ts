import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPropiedad } from 'src/models/IPropiedad';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-imagen',
  templateUrl: './eliminar-imagen.component.html',
})
export class EliminarImagenComponent implements OnInit {

  input_propiedad: IPropiedad;
  lsImagenes: any[] = [];
  eliminado: boolean = false;

  lsIds = {
    "lsIds":  []
  }
   //Variables de paginacion
   p: number = 1;

  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef,
    private propiedadService : PropiedadService,
  ) { }

  ngOnInit(){
    this.listarImagenes();
  }

  save(){

    this.propiedadService.eliminarFotos(this.lsIds).subscribe((resp:any)=>{
      Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
      this.bsModalRef.hide();
    })
  }

  listarImagenes(){
    this.propiedadService.listarImagenes(this.input_propiedad.idPropiedad).subscribe((resp:any)=>{
      this.lsImagenes = resp.aaData;
    })
  }

  eliminarFoto(imagen){
    this.eliminado = true;
    this.lsImagenes.forEach( img => {
      if(img.obj.nombreFoto == imagen.obj.nombreFoto){
        this.lsIds.lsIds.push(img.obj.idImagenPropiedad)
      }
    });
    this.lsImagenes = this.lsImagenes.filter( img => img.obj.nombreFoto != imagen.obj.nombreFoto);
    
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

}
