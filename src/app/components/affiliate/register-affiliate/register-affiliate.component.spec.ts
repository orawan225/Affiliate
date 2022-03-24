import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAffiliateComponent } from './register-affiliate.component';

describe('RegisterAffiliateComponent', () => {
  let component: RegisterAffiliateComponent;
  let fixture: ComponentFixture<RegisterAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
