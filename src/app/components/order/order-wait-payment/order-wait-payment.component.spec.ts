import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWaitPaymentComponent } from './order-wait-payment.component';

describe('OrderWaitPaymentComponent', () => {
  let component: OrderWaitPaymentComponent;
  let fixture: ComponentFixture<OrderWaitPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderWaitPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWaitPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
