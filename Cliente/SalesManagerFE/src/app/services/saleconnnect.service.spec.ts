import { TestBed } from '@angular/core/testing';

import { SaleconnnectService } from './saleconnnect.service';

describe('SaleconnnectService', () => {
  let service: SaleconnnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleconnnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
