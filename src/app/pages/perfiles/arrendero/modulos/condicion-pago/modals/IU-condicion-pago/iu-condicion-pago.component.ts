import { Component, OnInit } from '@angular/core';
import { ICondicionPago } from 'src/models/ICondicionPago';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CondicionPagoService } from 'src/app/services/apis/condicion-pago.service';

@Component({
  selector: 'app-iu-condicion-pago',
  templateUrl: './iu-condicion-pago.component.html',
  styles: [
  ]
})
export class IUCondicionPagoComponent implements OnInit {

  input_condicion_pago: ICondicionPago;
  accion: string = null;
  condicionForm: FormGroup;
  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private condicionPagoService: CondicionPagoService,
  ) { }

  ngOnInit() {
    this.construirFormulario();
    if(this.input_condicion_pago != null){
      this.setearValores();
      this.accion = "A";
    }
  }

  construirFormulario(){
    this.condicionForm = this.builder.group({
      precio: [0,[Validators.required]],
      tiempo_contrato: ['',[Validators.required]],
      diacobro: ['',[Validators.required]],
      garantia_min: [0,[Validators.required]],
      garantia_max: [0,[Validators.required]],
      tasa:[0.0,[Validators.required]],
      responsabilidad: [false,[Validators.required]],
      alias: ['',Validators.required]
    });
  }

  private setearValores(){
    this.condicionForm.setValue({
      precio: this.input_condicion_pago.precio,
      tiempo_contrato: this.input_condicion_pago.tiempoMinContrato,
      diacobro: this.input_condicion_pago.diaMesCobro,
      garantia_min: this.input_condicion_pago.montoMinGarantia,
      garantia_max: this.input_condicion_pago.montoMaxGarantia,
      tasa: this.input_condicion_pago.tasaRecargo,
      responsabilidad: this.input_condicion_pago.responsabilidadReparar,
      alias: this.input_condicion_pago.alias
    });
  }

  private armarObjeto(){
    var condicion: ICondicionPago = {
      diaMesCobro: this.condicionForm.get('diacobro').value,
      montoMaxGarantia: this.condicionForm.get('garantia_max').value,
      montoMinGarantia: this.condicionForm.get('garantia_min').value,
      precio: this.condicionForm.get('precio').value,
      responsabilidadReparar: this.condicionForm.get('responsabilidad').value,
      tasaRecargo: this.condicionForm.get('tasa').value,
      tiempoMinContrato: this.condicionForm.get('tiempo_contrato').value,
      alias: this.condicionForm.get('alias').value,
      arrendero:{
        idArrendero: Number.parseInt(sessionStorage.getItem('id'))
      }
    }
    return condicion;
  }

  //Metodos modal
  public cerrarModal() {
    this.modalService.setDismissReason('CERRAR');
    this.bsModalRef.hide();
  }

  //Eventos de boton
  public crud() {
    if(this.condicionForm.valid){
      var condicion = this.armarObjeto();
      if(this.accion==null){
        this.condicionPagoService.registrarCondicionPago(condicion).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.bsModalRef.hide();
        });
      }else{
        condicion.idCondicionPago = this.input_condicion_pago.idCondicionPago;
        this.condicionPagoService.modificarCondicionPago(condicion).subscribe((resp:any)=>{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
          this.bsModalRef.hide();
        });
      }
    }else{
      Swal.fire('¡ADVERTENCIA!','Complete todos los campos para continuar','warning');
    }
  }
}
