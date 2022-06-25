import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncluiSaidaComponent } from './inclui-saida.component';

describe('IncluiSaidaComponent', () => {
  let component: IncluiSaidaComponent;
  let fixture: ComponentFixture<IncluiSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncluiSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluiSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
