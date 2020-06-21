import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-registro-client',
  templateUrl: './card-registro-client.component.html',
})
export class CardRegistroClientComponent implements OnInit {

  focus;
  focus1;
  focusTouched;
  focus1Touched;
  arrenderoForm: FormGroup;

  constructor(
    private build: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario(){
    this.arrenderoForm = this.build.group({
      dni: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      fecha_nac: [new Date(),[Validators.required]]
    });
  }

  get registerF(){
    return this.arrenderoForm.controls;
  }

}
