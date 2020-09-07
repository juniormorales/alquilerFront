import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CalificacionService } from 'src/app/services/apis/calificacion.service';
import { IInquilino } from 'src/models/IInquilino';
import { ICalificacion } from 'src/models/ICalificacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificar-inquilino',
  templateUrl: './calificar-inquilino.component.html',
  styles: [
  ]
})
export class CalificarInquilinoComponent implements OnInit {

  input_inquilino: IInquilino;
  calificacion: number = 0;
  comentario: string;
  idArrendero: number;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private calificacionService: CalificacionService
  ) { }

  ngOnInit(): void {
    this.idArrendero = Number.parseInt(localStorage.getItem("id"));
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  calificar(){
    var calificacion: ICalificacion = {
      arrendatario: {
        idArrendatario: this.input_inquilino.arrendatario.idArrendatario
      },
      arrendero: {
        idArrendero: this.idArrendero
      },
      calificacion: this.calificacion,
      comentario: this.comentario
    }
    this.calificacionService.registrarCalificacion(calificacion).subscribe((resp: any) => {
      this.bsModalRef.hide();
    })
  }

}
