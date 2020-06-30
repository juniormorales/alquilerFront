import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IPropiedad } from 'src/models/IPropiedad';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PropiedadService } from 'src/app/services/apis/propiedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-imagen',
  templateUrl: './agregar-imagen.component.html',
  styleUrls: ['./agregar-imagen.component.scss']
})
export class AgregarImagenComponent implements OnInit {

  input_propiedad: IPropiedad;

  @Input() avatar: boolean = false;
  @Input() image: string;
  file: any = {};
  imagePreviewUrl: any = {};
  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private propiedadService : PropiedadService,
  ) {
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  ngOnInit() {
    console.log(this.input_propiedad)
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
      // this.state.imagePreviewUrl1 = reader.result;
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
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }

  subirImagen() {
    this.propiedadService.subirImagen(this.file,this.input_propiedad.idPropiedad).subscribe((resp:any)=>{
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
