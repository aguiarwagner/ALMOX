import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaSaidaComponent } from './visualiza-saida.component';

describe('VisualizaSaidaComponent', () => {
  let component: VisualizaSaidaComponent;
  let fixture: ComponentFixture<VisualizaSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizaSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizaSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
