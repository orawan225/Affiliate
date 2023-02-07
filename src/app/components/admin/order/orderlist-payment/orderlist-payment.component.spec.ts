import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistPaymentComponent } from './orderlist-payment.component';

describe('OrderlistPaymentComponent', () => {
  let component: OrderlistPaymentComponent;
  let fixture: ComponentFixture<OrderlistPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlistPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
