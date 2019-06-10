import { TestBed, async, inject } from '@angular/core/testing';

import { IniciarSesionGuard } from './iniciar-sesion.guard';

describe('IniciarSesionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IniciarSesionGuard]
    });
  });

  it('should ...', inject([IniciarSesionGuard], (guard: IniciarSesionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
