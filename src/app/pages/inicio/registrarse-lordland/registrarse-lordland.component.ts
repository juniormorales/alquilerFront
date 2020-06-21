import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrarse-lordland',
  templateUrl: './registrarse-lordland.component.html',
  styles: [
  ]
})
export class RegistrarseLordlandComponent implements OnInit {

  focus;
  focus1;
  focus2;
  config = [{
    'wheelSpeed':2
  }]
  constructor() {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
