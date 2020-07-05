import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/models/IUsuario';
import { AdminService } from 'src/app/services/apis/admin.service';

@Component({
  selector: 'app-gestion-cuentas',
  templateUrl: './gestion-cuentas.component.html',
  styles: [
  ]
})
export class GestionCuentasComponent implements OnInit {

  //Variables NgxTable
  entries: number = 5;
  temp = [];

  lsCuentas: IUsuario [] = [];

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.listarSolicitantes();
  }


  //Metodos Para NgxTable
  llenarTabla() {
    this.temp = this.lsCuentas.map((prop, key) => {
      return {
        ...prop,
        id: key
      };

    });
  }

  listarSolicitantes() {
    this.adminService.listarCuentas().subscribe((resp:any)=>{
      this.lsCuentas = resp.aaData;
      this.llenarTabla();
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

}
