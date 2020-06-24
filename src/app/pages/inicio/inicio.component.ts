import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContenidoComponent } from './contenido/contenido.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {

  eventsSubject: Subject<boolean> = new Subject<boolean>();  constructor() { }

  ngOnInit(): void {
  }

  onActivate(event){
    if(event instanceof ContenidoComponent){
      this.eventsSubject.next(false);    
    }else{
      this.eventsSubject.next(true);
    }
  }

}
