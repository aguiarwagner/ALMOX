import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiEntradaComponent } from './exclui-entrada.component';

describe('ExcluirComponent', () => {
  let component: ExcluiEntradaComponent;
  let fixture: ComponentFixture<ExcluiEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluiEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluiEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
