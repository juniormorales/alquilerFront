import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styles: [
  ]
})
export class ConfigureComponent implements OnInit {

  public sidebarColor: string = "red";
  public state: boolean = true;
  public dashboardColor: boolean = true;

  constructor() { }

  changeSidebarColor(color) {
    var sidebar = document.getElementsByClassName("sidebar")[0];
    var mainPanel = document.getElementsByClassName("main-panel")[0];

    this.sidebarColor = color;

    if (sidebar != undefined) {
      sidebar.setAttribute("data", color);
    }
    if (mainPanel != undefined) {
      mainPanel.setAttribute("data", color);
    }
  }

  changeDashboardColor(color) {
    var body = document.getElementsByTagName("body")[0];
    if (body && color === "white-content") {
      body.classList.add(color);
    } else if (body.classList.contains("white-content")) {
      body.classList.remove("white-content");
    }
  }

  ngOnInit() { 

  }

  onChangeDashboardColor(event) {
    const body = document.getElementsByTagName("body")[0];
    if (this.dashboardColor === true) {
      this.changeDashboardColor("");
    } else {
      this.changeDashboardColor("white-content");
    }
    var simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  onChange(event) {
    const body = document.getElementsByTagName("body")[0];
    if (this.state === true) {
      body.classList.remove("sidebar-mini");
    } else {
      body.classList.add("sidebar-mini");
    }
    var simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
}
