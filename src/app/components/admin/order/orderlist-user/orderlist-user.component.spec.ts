import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistUserComponent } from './orderlist-user.component';

describe('OrderlistUserComponent', () => {
  let component: OrderlistUserComponent;
  let fixture: ComponentFixture<OrderlistUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlistUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
