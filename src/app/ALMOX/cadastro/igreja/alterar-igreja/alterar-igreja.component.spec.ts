import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarIgrejaComponent } from './alterar-igreja.component';

describe('AlterarIgrejaComponent', () => {
  let component: AlterarIgrejaComponent;
  let fixture: ComponentFixture<AlterarIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarIgrejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
