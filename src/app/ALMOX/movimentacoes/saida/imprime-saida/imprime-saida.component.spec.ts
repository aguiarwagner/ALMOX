import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimeSaidaComponent } from './imprime-saida.component';

describe('ImprimeSaidaComponent', () => {
  let component: ImprimeSaidaComponent;
  let fixture: ComponentFixture<ImprimeSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimeSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimeSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
