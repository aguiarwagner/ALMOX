import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluiEntradaComponent } from './inclui-entrada.component';

describe('IncluiComponent', () => {
  let component: IncluiEntradaComponent;
  let fixture: ComponentFixture<IncluiEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluiEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluiEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
