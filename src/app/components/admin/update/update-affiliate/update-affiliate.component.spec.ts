import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAffiliateComponent } from './update-affiliate.component';

describe('UpdateAffiliateComponent', () => {
  let component: UpdateAffiliateComponent;
  let fixture: ComponentFixture<UpdateAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAffiliateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
