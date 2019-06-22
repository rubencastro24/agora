import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publicaciones } from '../models/publicaciones';
import { CabecerasService } from '../services/cabeceras.service';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {

  URL_API : string = 'http://localhost:80/api';

  constructor(
    public http: HttpClient,
    public cabecerasS: CabecerasService,
  ) { }
  
  public hacerPublicacion(imagen, descripcion) {
    this.cabecerasS.setHeadersPlain();

    console.log(imagen)
    return this.http.post<{type: boolean, data: string}>(`${this.URL_API}/publicaciones`, imagen,this.cabecerasS.cabeceras
    );
  }
}
