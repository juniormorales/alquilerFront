import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ZonasService } from 'src/app/services/public/zonas.service';
import { IUsuario } from 'src/models/IUsuario';
import { IArrendero } from 'src/models/IArrendero';
import { ArrenderoService } from 'src/app/services/apis/arrendero.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse-lordland',
  templateUrl: './registrarse-lordland.component.html'
})
export class RegistrarseLordlandComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched = false;
  focus4Touched;
  config = [{
    'wheelSpeed': 2,
    'scrollYMarginOffset':5
  }]

  eventsSubject: Subject<void> = new Subject<void>();
  generalForm: FormGroup;
  arrenderoForm: FormGroup;

  aceptoTerminos: boolean = false;

  //Variables del Dropdown
  lsDepartamentos: any = [];
  lsProvincias: any = [];
  lsDistritos: any = [];

  settingsGeneral= {
    singleSelection: true,
    text: 'Seleccionar ...',
    enableSearchFilter: false,
    classes: 'selectpicker btn-info',
    lazyLoading: true,
    maxHeight: 250,
    autoPosition: false,
    position: 'bottom'
  }

  //Data para el angular2-dropdown
  dataDep: any[] = [];
  dataProv: any[] = [];
  dataDist: any[] = [];

  constructor(
    private _zonaService: ZonasService,
    private builder: FormBuilder,
    private arrenderoService : ArrenderoService,
    private route: Router
  ) { }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
    this.listarDepartamentos();
    this.construirFormulario();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  construirFormulario(){
    this.arrenderoForm = this.builder.group({
      direccion: ['',Validators.required],
      nroPartidaRegistral: ['',Validators.required],
      departamento:[[],[Validators.required]],
      provincia: [[],[Validators.required]],
      distrito: [[],[Validators.required]]
    });
  }

  get registerF(){
    return this.arrenderoForm.controls;
  }

  registrarArrendero() {
    if(this.generalForm.valid && this.arrenderoForm.valid){
      var arrendero = this.construirObjeto();
      this.arrenderoService.registrarArrendero(arrendero).subscribe((resp:any)=>{
        if(resp.estado){
          this.redirigirLogin(resp);
        }else{
          Swal.fire(resp.titulo,resp.mensaje,resp.tipo);
        }
      });
    }else{
      Swal.fire('¡INFO!','Complete los campos obligatorios para continuar','info');
    }
  }

  private construirObjeto(): IArrendero{
    var arrendero : IArrendero  = {
      direccionActual: this.arrenderoForm.get('direccion').value,
      nroPartidaRegistral: this.arrenderoForm.get('nroPartidaRegistral').value,
      departamento:{
        idDepartamento: this.arrenderoForm.get('departamento').value[0].id
      },
      provincia:{
        idProvincia: this.arrenderoForm.get('provincia').value[0].id
      },
      distrito:{
        idDistrito: this.arrenderoForm.get('distrito').value[0].id
      },
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
        estado: false,
        tipoUsuario: 'ARRENDERO',
        perfil:{
          idPerfil:2
        }
      }
    };
    return arrendero;
  }

  guardarForm(event: FormGroup) {
    this.generalForm = event;
  }

  terminosAceptados(cambio) {
    this.eventsSubject.next();
  }

  //Web service lista Departamentos
  listarDepartamentos() {
    this._zonaService.listarDepartamentos().subscribe((resp: any) => {
      this.lsDepartamentos = resp.aaData;
      this.lsDepartamentos.forEach(element => {
        this.dataDep.push({ "id": element.idDepartamento, "itemName": element.descripcion });
      });
    });
  }

  //Web service listar Provincias
  listarProvincias(dep) {
    this._zonaService.listarProvincias(dep).subscribe((resp: any) => {
      this.lsProvincias = resp.aaData;
      this.lsProvincias.forEach(element => {
        this.dataProv.push({ "id": element.idProvincia, "itemName": element.descripcion });
      });
    });
  }

  //Web Service listar Distritos
  listarDistritos(prov) {
    this._zonaService.listarDistritos(prov).subscribe((resp: any) => {
      this.lsDistritos = resp.aaData;
      this.lsDistritos.forEach(element => {
        this.dataDist.push({ "id": element.idDistrito, "itemName": element.descripcion });
      });
    });
  }

  //Eventos del Dropdown
  onProvinciaSelect(event){
    this.dataDist = [];
    this.arrenderoForm.patchValue({distrito:[]})
    this.listarDistritos({"idProvincia":event.id});
  }

  onDepartamentoSelect(event){
    this.dataProv = [];
    this.arrenderoForm.patchValue({provincia:[]})
    this.arrenderoForm.patchValue({distrito:[]})
    this.listarProvincias({"idDepartamento":event.id});
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
