import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaInventarioComponent } from './visualiza-inventario.component';

describe('VisualizaInventarioComponent', () => {
  let component: VisualizaInventarioComponent;
  let fixture: ComponentFixture<VisualizaInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizaInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
