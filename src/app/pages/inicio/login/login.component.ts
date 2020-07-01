import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/apis/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsuario } from 'src/models/IUsuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  focus;
  focus1;

  public usuarioForm: FormGroup;
  public usuarioLogin: IUsuario;
  constructor(
    private loginService: LoginService,
    private builder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  public ingresar(){
    if(this.usuarioForm.valid){
      this.construirObjeto();
      this.loginService.logueate(this.usuarioLogin).subscribe( (token:any)=>{
        this.loginService.verificarInhabilitado(this.usuarioLogin).subscribe((resp:any)=>{
          if(!resp.obj){
            this.loginService.redirigirModulo();
          }
        })
    })
    }else{
      Swal.fire('ADVERTENCIA','Llene todos los campos antes de continuar','warning');
    }
  }

  construirFormulario(){
    this.usuarioForm = this.builder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  construirObjeto(){
    this.usuarioLogin = {
      username: this.usuarioForm.get('username').value,
      password: this.usuarioForm.get('password').value
    }
  }

}
