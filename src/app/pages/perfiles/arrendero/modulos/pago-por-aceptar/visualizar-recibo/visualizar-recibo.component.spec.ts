import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarReciboComponent } from './visualizar-recibo.component';

describe('VisualizarReciboComponent', () => {
  let component: VisualizarReciboComponent;
  let fixture: ComponentFixture<VisualizarReciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarReciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
