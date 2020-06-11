import { TestBed } from '@angular/core/testing';

import { CommandRequesterService } from './command-requester.service';

describe('CommandRequesterService', () => {
  let service: CommandRequesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandRequesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
