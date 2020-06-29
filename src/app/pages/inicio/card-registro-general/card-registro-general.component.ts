import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-registro-general',
  templateUrl: './card-registro-general.component.html',
})
export class CardRegistroGeneralComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focusTouched;
  focus1Touched;
  focus2Touched;
  focus3Touched;
  focus4Touched;
  focus5Touched;
  focus6Touched;
  focus7Touched = false;

  private eventsSubscription: Subscription;
  Form: FormGroup;
  @Input() events: Observable<void>;
  @Output() enviarForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  
  constructor(
    private build: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
    this.eventsSubscription = this.events.subscribe(() => {
      this.enviarForm.emit(this.Form);
    });
  }

  private construirFormulario(){
    this.Form = this.build.group({
      dni: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      fecha_nac: ['',[Validators.required]],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      telefono:[''],
      nro_cel:[''],
      username:['',Validators.required],
      pass:['',Validators.required],
      email:['',Validators.required],
      confirmar:['',Validators.required]
    });
  }

  get registerF(){
    return this.Form.controls;
  }

}
