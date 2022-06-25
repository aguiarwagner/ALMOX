import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaEntradaComponent } from './visualiza-entrada.component';

describe('VisualizaEntradaComponent', () => {
  let component: VisualizaEntradaComponent;
  let fixture: ComponentFixture<VisualizaEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizaEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
