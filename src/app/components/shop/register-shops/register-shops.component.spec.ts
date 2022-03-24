import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShopsComponent } from './register-shops.component';

describe('RegisterShopsComponent', () => {
  let component: RegisterShopsComponent;
  let fixture: ComponentFixture<RegisterShopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterShopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterShopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
