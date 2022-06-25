import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualFornecedorComponent } from './visual-fornecedor.component';

describe('VisualizarFornecedorComponent', () => {
  let component: VisualFornecedorComponent;
  let fixture: ComponentFixture<VisualFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
