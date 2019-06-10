import { TestBed } from '@angular/core/testing';

import { IniciarSesionService } from './iniciar-sesion.service';

describe('IniciarSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IniciarSesionService = TestBed.get(IniciarSesionService);
    expect(service).toBeTruthy();
  });
});
