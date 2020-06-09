import { TestBed } from '@angular/core/testing';

import { DroneDiscoveryService } from './drone-discovery.service';

describe('DroneDiscoveryService', () => {
  let service: DroneDiscoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneDiscoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
