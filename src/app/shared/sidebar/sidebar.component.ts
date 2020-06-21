import { Component, OnInit } from "@angular/core";
import { ModuloService } from 'src/app/services/modulo.service';
import { RouteInfo } from 'src/models/IRouteInfo';

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: "/administracion/dashboard",
    title: "Dashboard",
    type: "link",
    icontype: "tim-icons icon-chart-pie-36"
  },
  {
    path: "/pages",
    title: "Pages",
    type: "sub",
    icontype: "tim-icons icon-image-02",
    collapse: "pages",
    isCollapsed: true,
    children: [
      {
        path: "pricing",
        title: "Pricing",
        type: "link",
        smallTitle: "P"
      },
      {
        path: "rtl",
        title: "RTL Support",
        type: "link",
        smallTitle: "RS"
      },
      {
        path: "timeline",
        title: "Timeline",
        type: "link",
        smallTitle: "T"
      },
      {
        path: "login",
        title: "Login",
        type: "link",
        smallTitle: "L"
      },
      {
        path: "register",
        title: "Register",
        type: "link",
        smallTitle: "R"
      },
      {
        path: "lock",
        title: "Lock Screen",
        type: "link",
        smallTitle: "LS"
      },
      {
        path: "profile",
        title: "User Profile",
        type: "link",
        smallTitle: "UP"
      }
    ]
  },
  {
    path: "/components",
    title: "Components",
    type: "sub",
    icontype: "tim-icons icon-molecule-40",
    collapse: "components",
    isCollapsed: true,
    children: [
      {
        path: "multilevel",
        isCollapsed: true,
        title: "Multilevel Collapse",
        type: "sub",
        smallTitle: "MLT",
        collapse: "multilevel",
        children: [
          {
            path: "buttons",
            title: "Buttons",
            type: "link",
            smallTitle: "B"
          }
        ]
      },
      {
        path: "buttons",
        title: "Buttons",
        type: "link",
        smallTitle: "B"
      },
      {
        path: "grid",
        title: "Grid System",
        type: "link",
        smallTitle: "GS"
      },
      {
        path: "panels",
        title: "Panels",
        type: "link",
        smallTitle: "P"
      },
      {
        path: "sweet-alert",
        title: "Sweet Alert",
        type: "link",
        smallTitle: "SA"
      },
      {
        path: "notifications",
        title: "Notifications",
        type: "link",
        smallTitle: "N"
      },
      {
        path: "icons",
        title: "Icons",
        type: "link",
        smallTitle: "I"
      },
      {
        path: "typography",
        title: "Typography",
        type: "link",
        smallTitle: "T"
      }
    ]
  },
  {
    path: "/forms",
    title: "Forms",
    type: "sub",
    icontype: "tim-icons icon-notes",
    collapse: "forms",
    isCollapsed: true,
    children: [
      {
        path: "regular",
        title: "Regular Forms",
        type: "link",
        smallTitle: "RF"
      },
      {
        path: "extended",
        title: "Extended Forms",
        type: "link",
        smallTitle: "EF"
      },
      {
        path: "validation",
        title: "Validation Forms",
        type: "link",
        smallTitle: "VF"
      },
      {
        path: "wizard",
        title: "Wizard",
        type: "link",
        smallTitle: "W"
      }
    ]
  },
  {
    path: "/tables",
    title: "Tables",
    type: "sub",
    icontype: "tim-icons icon-puzzle-10",
    collapse: "tables",
    isCollapsed: true,
    children: [
      {
        path: "regular",
        title: "Regular Tables",
        type: "link",
        smallTitle: "RT"
      },
      {
        path: "extended",
        title: "Extended Tables",
        type: "link",
        smallTitle: "ET"
      },
      {
        path: "ngx-datatable",
        title: "Ngx Datatable",
        type: "link",
        smallTitle: "ND"
      }
    ]
  },
  {
    path: "/maps",
    title: "Maps",
    type: "sub",
    icontype: "tim-icons icon-pin",
    collapse: "maps",
    isCollapsed: true,
    children: [
      {
        path: "google",
        title: "Google Maps",
        type: "link",
        smallTitle: "GM"
      },
      {
        path: "full-screen",
        title: "Full Screen Map",
        type: "link",
        smallTitle: "FSM"
      },
      {
        path: "vector",
        title: "Vector Map",
        type: "link",
        smallTitle: "VM"
      }
    ]
  },
  {
    path: "/widgets",
    title: "Widgets",
    type: "link",
    icontype: "tim-icons icon-settings"
  },
  {
    path: "/charts",
    title: "Charts",
    type: "link",
    icontype: "tim-icons icon-chart-bar-32"
  },
  {
    path: "/calendar",
    title: "Calendar",
    type: "link",
    icontype: "tim-icons icon-time-alarm"
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private moduloService: ModuloService
  ) {}

  ngOnInit() {
    this.listarModulosPorPerfil();
  }

  private listarModulosPorPerfil(){
    this.moduloService.listarModulos({"idPerfil":1}).subscribe((resp:any)=>{
      this.menuItems = resp.aaData;
      
    })
  }
}
