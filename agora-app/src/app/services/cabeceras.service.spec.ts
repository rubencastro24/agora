import { TestBed } from '@angular/core/testing';

import { CabecerasService } from './cabeceras.service';

describe('CabecerasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabecerasService = TestBed.get(CabecerasService);
    expect(service).toBeTruthy();
  });
});
