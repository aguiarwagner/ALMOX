import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualIgrejaComponent } from './visual-igreja.component';

describe('VisualIgrejaComponent', () => {
  let component: VisualIgrejaComponent;
  let fixture: ComponentFixture<VisualIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualIgrejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
