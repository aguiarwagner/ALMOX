import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirIgrejaComponent } from './excluir-igreja.component';

describe('ExcluirIgrejaComponent', () => {
  let component: ExcluirIgrejaComponent;
  let fixture: ComponentFixture<ExcluirIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluirIgrejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluirIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
