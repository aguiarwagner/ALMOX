import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiInventarioComponent } from './exclui-inventario.component';

describe('ExcluiInventarioComponent', () => {
  let component: ExcluiInventarioComponent;
  let fixture: ComponentFixture<ExcluiInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluiInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluiInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
