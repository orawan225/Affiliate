import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFollowProductComponent } from './order-follow-product.component';

describe('OrderFollowProductComponent', () => {
  let component: OrderFollowProductComponent;
  let fixture: ComponentFixture<OrderFollowProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFollowProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFollowProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
