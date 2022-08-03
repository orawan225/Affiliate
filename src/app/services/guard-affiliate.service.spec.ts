import { TestBed } from '@angular/core/testing';

import { GuardAffiliateService } from './guard-affiliate.service';

describe('GuardAffiliateService', () => {
  let service: GuardAffiliateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardAffiliateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
