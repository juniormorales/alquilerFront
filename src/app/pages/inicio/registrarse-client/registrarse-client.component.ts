import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IArrendatario } from 'src/models/IArrendatario';
import { ArrendatarioService } from 'src/app/services/apis/arrendatario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse-client.component.html',
  styles: [
  ]
})
export class RegistrarseClientComponent implements OnInit {

  config = [{
    'wheelSpeed':2,
    'scrollYMarginOffset':5
  }]

  eventsSubject: Subject<void> = new Subject<void>();
  generalForm: FormGroup;
  arrendatarioForm: FormGroup;

  focus;
  focusTouched;


  aceptoTerminos: boolean = false;

  constructor(
    private builder: FormBuilder,
    private arrendatarioService: ArrendatarioService,
    private route: Router
  ) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    this.construirFormulario();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  construirFormulario(){
    this.arrendatarioForm = this.builder.group({
      direccion: ['',Validators.required]
    });
  }

  get registerF(){
    return this.arrendatarioForm.controls;
  }

  registrarArrendatario(){
    if(this.generalForm.valid && this.arrendatarioForm.valid){
      var arrendatario = this.construirObjeto();
      this.arrendatarioService.registrarArrendatario(arrendatario).subscribe((resp:any)=>{
        if(resp.estado){
          this.redirigirLogin(resp);
        }else{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
        }
      })
    }else{
      Swal.fire('¡INFO!','Complete los campos obligatorios para continuar','info');
    }
  }

  private construirObjeto(){
    var arrendatario : IArrendatario = {
      direccionTemporal: this.arrendatarioForm.get('direccion').value,
      usuario: {
        username: this.generalForm.get('username').value,
        password: this.generalForm.get('pass').value,
        nombres: this.generalForm.get('nombre').value,
        apellidos: this.generalForm.get('apellido').value,
        nroCel: this.generalForm.get('nro_cel').value,
        telefono: this.generalForm.get('telefono').value,
        email: this.generalForm.get('email').value,
        dni: this.generalForm.get('dni').value,
        fechaNacimiento: this.generalForm.get('fecha_nac').value,
        estado: true,
        tipoUsuario: 'ARRENDATARIO',
        perfil:{
          idPerfil:3
        }
      }
    }
    return arrendatario;
  }

  guardarForm(event){
    this.generalForm = event;
  }

  terminosAceptados(cambio) {
    this.eventsSubject.next();
  }

  private redirigirLogin(resp:any){
    Swal.fire({
      title: resp.titulo,
      text: resp.mensaje,
      icon: resp.tipo,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ir al login'
    }).then((result) => {
      if (result.value) {
        this.route.navigate(['/inicio/login']);
      }
    })
  }

}
