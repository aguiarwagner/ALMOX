import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirFornecedorComponent } from './incluir-fornecedor.component';

describe('IncluirFornecedorComponent', () => {
  let component: IncluirFornecedorComponent;
  let fixture: ComponentFixture<IncluirFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluirFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
