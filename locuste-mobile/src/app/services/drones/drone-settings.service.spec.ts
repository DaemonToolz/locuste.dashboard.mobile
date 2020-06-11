import { TestBed } from '@angular/core/testing';

import { DroneSettingsService } from './drone-settings.service';

describe('DroneSettingsService', () => {
  let service: DroneSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DroneSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
