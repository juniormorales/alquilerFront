import { Component, OnInit } from '@angular/core';

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
