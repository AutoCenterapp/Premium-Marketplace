import { TestBed } from '@angular/core/testing';

import { GeneralObservablesService } from './general-observables.service';

describe('GeneralObservablesService', () => {
  let service: GeneralObservablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralObservablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
