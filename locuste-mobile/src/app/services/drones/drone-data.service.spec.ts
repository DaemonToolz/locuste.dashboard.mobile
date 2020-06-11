import { TestBed } from '@angular/core/testing';

import { DroneDataService } from './drone-data.service';

describe('DroneDataService', () => {
  let service: DroneDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
