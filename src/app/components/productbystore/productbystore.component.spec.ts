import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductbystoreComponent } from './productbystore.component';

describe('ProductbystoreComponent', () => {
  let component: ProductbystoreComponent;
  let fixture: ComponentFixture<ProductbystoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductbystoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductbystoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
