import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluiSaidaComponent } from './exclui-saida.component';

describe('ExcluiSaidaComponent', () => {
  let component: ExcluiSaidaComponent;
  let fixture: ComponentFixture<ExcluiSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcluiSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluiSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
