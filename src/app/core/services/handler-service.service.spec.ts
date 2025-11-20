import { TestBed } from '@angular/core/testing';

import { HandlerServiceService } from './handler-service.service';

describe('HandlerServiceService', () => {
  let service: HandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
