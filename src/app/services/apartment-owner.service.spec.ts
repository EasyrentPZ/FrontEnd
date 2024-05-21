import { TestBed } from '@angular/core/testing';

import { ApartmentOwnerService } from './apartment-owner.service';

describe('ApartmentOwnerService', () => {
  let service: ApartmentOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
