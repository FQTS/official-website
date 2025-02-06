import { TestBed } from '@angular/core/testing';

import { ProfessionalTrainingService } from './professional-training.service';

describe('ProfessionalTrainingService', () => {
  let service: ProfessionalTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
