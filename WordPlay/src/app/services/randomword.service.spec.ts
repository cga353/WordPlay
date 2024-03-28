import { TestBed } from '@angular/core/testing';

import { RandomWordService } from './randomword.service';

describe('RandomWordService', () => {
  let service: RandomWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
