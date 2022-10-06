import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteraInventarioComponent } from './altera-inventario.component';

describe('AlteraInventarioComponent', () => {
  let component: AlteraInventarioComponent;
  let fixture: ComponentFixture<AlteraInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteraInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteraInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
