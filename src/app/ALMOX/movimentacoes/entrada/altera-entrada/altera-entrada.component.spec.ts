import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteraEntradaComponent } from './altera-entrada.component';

describe('AlteraEntradaComponent', () => {
  let component: AlteraEntradaComponent;
  let fixture: ComponentFixture<AlteraEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteraEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteraEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
