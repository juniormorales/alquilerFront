import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { LoginService } from 'src/app/services/apis/login.service';
import { RouteInfo } from 'src/models/IRouteInfo';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

var misc: any = {
  sidebar_mini_active: true
};
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;

  private toggleButton: any;
  public isCollapsed = true;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    public toastr: ToastrService,
    private loginService: LoginService,
  ) {
    this.location = location;
  }

  updateColor = () => {
    var navbar = document.getElementsByClassName("navbar")[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
      navbar.classList.add("bg-white");
      navbar.classList.remove("navbar-transparent");
    } else {
      navbar.classList.remove("bg-white");
      navbar.classList.add("navbar-transparent");
    }
  };

  minimizeSidebar() {
    const body = document.getElementsByTagName("body")[0];
    if (body.classList.contains("sidebar-mini")) {
      misc.sidebar_mini_active = true;
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove("sidebar-mini");
      misc.sidebar_mini_active = false;
    } else {
      body.classList.add("sidebar-mini");
      misc.sidebar_mini_active = true;
    }

    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }


  ngOnInit() {
    var routes : RouteInfo [] = JSON.parse(localStorage.getItem('ROUTES'));
    window.addEventListener("resize", this.updateColor);
    this.listTitles = routes.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
    });

    console.log(new Date())
  }

  ngOnDestroy() {
    window.removeEventListener("resize", this.updateColor);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "SUB MODULO";
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = <HTMLElement>(
      document.getElementsByTagName("body")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
      body.style.position = "fixed";
    }

    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");
    var $layer = document.createElement('div');
    $layer.setAttribute('id', 'bodyClick');


    if (html.getElementsByTagName('body')) {
      document.getElementsByTagName('body')[0].appendChild($layer);
    }
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];
    $layer.onclick = function () { //asign a function
      html.classList.remove('nav-open');
      setTimeout(function () {
        $layer.remove();
        $toggle.classList.remove('toggled');
      }, 400);
      const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];

      if (window.innerWidth < 991) {
        setTimeout(function () {
          mainPanel.style.position = '';
        }, 500);
      }
    }.bind(this);

    html.classList.add('nav-open');
  }

  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const body = <HTMLElement>(
      document.getElementsByTagName("body")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
        body.style.position = "";
      }, 500);
    }
    var $layer: any = document.getElementById("bodyClick");
    if ($layer) {
      $layer.remove();

    }
    html.classList.remove("nav-open");
  }

  logout(){
    this.loginService.logOut();
  }
}
