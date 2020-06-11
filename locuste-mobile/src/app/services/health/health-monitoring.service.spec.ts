import { TestBed } from '@angular/core/testing';

import { HealthMonitoringService } from './health-monitoring.service';

describe('HealthMonitoringService', () => {
  let service: HealthMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
