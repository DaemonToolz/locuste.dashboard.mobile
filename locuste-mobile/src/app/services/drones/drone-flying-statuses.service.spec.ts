import { TestBed } from '@angular/core/testing';

import { DroneFlyingStatusesService } from './drone-flying-statuses.service';

describe('DroneFlyingStatusesService', () => {
  let service: DroneFlyingStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneFlyingStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
