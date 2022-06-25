import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarFornecedorComponent } from './alterar-fornecedor.component';

describe('AlterarFornecedorComponent', () => {
  let component: AlterarFornecedorComponent;
  let fixture: ComponentFixture<AlterarFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
