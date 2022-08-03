import { TestBed } from '@angular/core/testing';

import { GuardStoreService } from './guard-store.service';

describe('GuardStoreService', () => {
  let service: GuardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
