import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualProdutoComponent } from './visual-produto.component';

describe('VisualProdutoComponent', () => {
  let component: VisualProdutoComponent;
  let fixture: ComponentFixture<VisualProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
