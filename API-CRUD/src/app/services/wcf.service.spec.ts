import { TestBed } from '@angular/core/testing';

import { WCFService } from './wcf.service';

describe('WCFService', () => {
  let service: WCFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WCFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
