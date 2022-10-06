import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluiInventarioComponent } from './inclui-inventario.component';

describe('IncluiInventarioComponent', () => {
  let component: IncluiInventarioComponent;
  let fixture: ComponentFixture<IncluiInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluiInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluiInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
