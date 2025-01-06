import { TestBed } from '@angular/core/testing';

import { AutentykacjaService } from './autentykacja.service';

describe('AutentykacjaService', () => {
  let service: AutentykacjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentykacjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
