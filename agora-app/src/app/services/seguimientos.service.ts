import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seguimientos } from '../models/seguimientos';
import { CabecerasService } from '../services/cabeceras.service';

@Injectable({
  providedIn: 'root'
})

export class SeguimientosService {

  URL_API : string = 'http://localhost:80/api';

  constructor(
    public http: HttpClient,
    public cabecerasS: CabecerasService,
  ){ }  
  
  public cambiarSeguimiento(id: Seguimientos['sigue']) {
    this.cabecerasS.setHeaders();
    return this.http.put(`${this.URL_API}/seguimiento/${id}`, {},this.cabecerasS.cabeceras);
  }

  public obtenerSeguimiento(id: Seguimientos['sigue']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/seguimiento/${id}`, this.cabecerasS.cabeceras);
  }

  public obtenerSeguidor(id: Seguimientos['sigue']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/seguidor/${id}`, this.cabecerasS.cabeceras);
  }
  
  public obtenerSeguimientos(id: Seguimientos['sigue']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/seguimientos/${id}`, this.cabecerasS.cabeceras);
  }

  public obtenerSeguidores(id: Seguimientos['usuario']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/seguidores/${id}`, this.cabecerasS.cabeceras);
  }

}