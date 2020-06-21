import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";

var misc: any = {
  sidebar_mini_active: true
};

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './navbar-auth.component.html',
})
export class NavbarAuthComponent implements OnInit {
  isCollapsed = true;
  private listTitles: any[];
  location: Location;

  constructor(location: Location, public toastr: ToastrService) {
    this.location = location;
  }
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
      this.showSidebarMessage("Sidebar mini deactivated...");
    } else {
      body.classList.add("sidebar-mini");
      this.showSidebarMessage("Sidebar mini activated...");
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function() {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function() {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
  showSidebarMessage(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
  ngOnInit() {
  }
}
