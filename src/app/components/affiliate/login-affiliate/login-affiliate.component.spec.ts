import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAffiliateComponent } from './login-affiliate.component';

describe('LoginAffiliateComponent', () => {
  let component: LoginAffiliateComponent;
  let fixture: ComponentFixture<LoginAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
