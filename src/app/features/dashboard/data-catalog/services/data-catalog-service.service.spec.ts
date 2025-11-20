import { TestBed } from '@angular/core/testing';

import { DataCatalogServiceService } from './data-catalog-service.service';

describe('DataCatalogServiceService', () => {
  let service: DataCatalogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCatalogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
