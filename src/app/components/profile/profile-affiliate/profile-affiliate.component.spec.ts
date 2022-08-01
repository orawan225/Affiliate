import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAffiliateComponent } from './profile-affiliate.component';

describe('ProfileAffiliateComponent', () => {
  let component: ProfileAffiliateComponent;
  let fixture: ComponentFixture<ProfileAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
