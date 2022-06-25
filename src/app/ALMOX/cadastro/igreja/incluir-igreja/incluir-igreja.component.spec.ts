import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluirIgrejaComponent } from './incluir-igreja.component';

describe('IncluirIgrejaComponent', () => {
  let component: IncluirIgrejaComponent;
  let fixture: ComponentFixture<IncluirIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluirIgrejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
