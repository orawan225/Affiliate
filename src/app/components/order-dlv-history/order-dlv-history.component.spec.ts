import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDlvHistoryComponent } from './order-dlv-history.component';

describe('OrderDlvHistoryComponent', () => {
  let component: OrderDlvHistoryComponent;
  let fixture: ComponentFixture<OrderDlvHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDlvHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDlvHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
