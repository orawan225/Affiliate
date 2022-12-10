import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWaitDeliveryComponent } from './order-wait-delivery.component';

describe('OrderWaitDeliveryComponent', () => {
  let component: OrderWaitDeliveryComponent;
  let fixture: ComponentFixture<OrderWaitDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderWaitDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWaitDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
