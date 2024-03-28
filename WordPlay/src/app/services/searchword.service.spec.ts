import { TestBed } from '@angular/core/testing';

import { SearchwordService } from './searchword.service';

describe('SearchwordService', () => {
  let service: SearchwordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchwordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
