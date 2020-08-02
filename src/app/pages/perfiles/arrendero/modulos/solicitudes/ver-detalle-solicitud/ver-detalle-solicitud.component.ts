import { Component, OnInit } from '@angular/core';
import { ISolicitudPropiedad } from 'src/models/ISolicitudPropiedad';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CalificacionService } from 'src/app/services/apis/calificacion.service';
import { ICalificacion } from 'src/models/ICalificacion';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-ver-detalle-solicitud',
  templateUrl: './ver-detalle-solicitud.component.html',
  styles: [
  ]
})
export class VerDetalleSolicitudComponent implements OnInit {

  input_sol_prop: ISolicitudPropiedad;
  rate = 0;
  lsCalificaciones: ICalificacion [] = [];

  config: PerfectScrollbarConfigInterface []= [
    {
      wheelSpeed:2,
      scrollYMarginOffset:5,
      suppressScrollY: true
    }
  ] 
  
  constructor(
    private modalService : BsModalService,
    private bsModalRef : BsModalRef,
    private calificacionService: CalificacionService
  ) { }

  ngOnInit(): void {
    this.listarCalificacion();
  }

  listarCalificacion(){
    this.calificacionService.listarCalificacionPorArrendatario(this.input_sol_prop.arrendatario.idArrendatario).subscribe((resp:any)=>{
      this.lsCalificaciones = resp.aaData;
      this.lsCalificaciones.forEach( calificacion => {
        this.rate = this.rate + calificacion.calificacion;
      })
      this.rate = this.rate/this.lsCalificaciones.length
    });
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }
}
