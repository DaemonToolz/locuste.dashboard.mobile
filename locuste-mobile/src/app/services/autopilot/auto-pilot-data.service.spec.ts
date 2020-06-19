import { TestBed } from '@angular/core/testing';

import { AutoPilotDataService } from './auto-pilot-data.service';

describe('AutoPilotDataService', () => {
  let service: AutoPilotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoPilotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
