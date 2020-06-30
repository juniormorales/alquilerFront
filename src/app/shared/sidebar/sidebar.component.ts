import { Component, OnInit } from "@angular/core";
import { ModuloService } from 'src/app/services/apis/modulo.service';
import { RouteInfo } from 'src/models/IRouteInfo';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {

  menuItems: RouteInfo[];
  public token: any;
  public perfil: string;

  constructor(
    private moduloService: ModuloService,
    private helper: JwtHelperService,
  ) {}

  ngOnInit() {
    this.token = this.helper.decodeToken(sessionStorage.getItem('sesion'));
    this.perfil = this.token.nombre_perfil;
    this.listarModulosPorPerfil();
  }

  private listarModulosPorPerfil(){
    this.moduloService.listarModulos({"idPerfil":this.token.id_perfil}).subscribe((resp:any)=>{
      this.menuItems = resp.aaData;
      localStorage.setItem('ROUTES',JSON.stringify(this.menuItems));
    })
  }
}
