import { TestBed } from '@angular/core/testing';

import { ExternalModMonitoringService } from './external-mod-monitoring.service';

describe('ExternalModMonitoringService', () => {
  let service: ExternalModMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalModMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
