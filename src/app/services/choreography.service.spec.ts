import { TestBed } from '@angular/core/testing';

import { ChoreographyService } from './choreography.service';

describe('ChoreographyService', () => {
  let service: ChoreographyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoreographyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
