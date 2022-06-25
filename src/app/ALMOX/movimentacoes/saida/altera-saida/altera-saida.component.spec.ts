import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteraSaidaComponent } from './altera-saida.component';

describe('AlteraSaidaComponent', () => {
  let component: AlteraSaidaComponent;
  let fixture: ComponentFixture<AlteraSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlteraSaidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteraSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
