import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IRenta } from 'src/models/IRenta';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IPago } from 'src/models/IPago';
import { PagoService } from 'src/app/services/apis/pago.service';

@Component({
  selector: 'app-registro-pago',
  templateUrl: './registro-pago.component.html',
  styleUrls: ['./registro-pago.component.scss']
})
export class RegistroPagoComponent implements OnInit {
  
  input_renta: IRenta;

  @Input() avatar: boolean = false;
  @Input() image: string;
  file: any = {};
  imagePreviewUrl: any = {};
  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private pagoService: PagoService,
  ) {
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  ngOnInit() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
          ? "assets/img/placeholder.jpg"
          : "assets/img/image_placeholder.jpg";
  }

  handleImageChange($event) {
    $event.preventDefault();
    let reader = new FileReader();
    let file = $event.target.files[0];
    reader.onloadend = () => {
      this.file = file;
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  handleClick() {
    this.fileInput.nativeElement.click();
  }
  handleRemove() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
          ? "assets/img/placeholder.jpg"
          : "assets/img/image_placeholder.jpg";
    this.fileInput.nativeElement.value = null;
  }

  handleSubmit($event) {
    $event.preventDefault();
  }

  subirImagen() {
    var pago :IPago = {
      estado: false,
      monto: 0.0,
      renta: this.input_renta,
      arrendero: this.input_renta.inquilino.arrendero
    }
    this.pagoService.enviarPagoParaConfirmacion(pago).subscribe((resp:any)=>{
      Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
      this.bsModalRef.hide();
    });
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

}
