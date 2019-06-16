import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { CabecerasService } from '../services/cabeceras.service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  usuarios : Usuarios[];
  URL_API = 'http://localhost:80/api/usuarios'

  constructor(
    public http : HttpClient,
    public cabecerasS: CabecerasService
  ){ }

  public obtenerUsuarios() {
    this.cabecerasS.setHeaders();
    return this.http.get(this.URL_API, this.cabecerasS.cabeceras);
  }

  public obtenerUsuariosBusqueda(nick: Usuarios['nick']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/buscar/${nick}`, this.cabecerasS.cabeceras);
  }

  public obtenerUsuario(id: Usuarios['_id']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/${id}`, this.cabecerasS.cabeceras);
  }

  /*   obtenerUsuario(usuario: Usuarios) {
      this.cabecerasS.setHeaders();
      return this.http.get(this.URL_API + `/${usuario.id}`, this.cabecerasS.cabeceras);
    } */
  
  public crearUsuario(usuario: Usuarios) {
    return this.http.post(this.URL_API, usuario/* , {headers: this.cabeceras} */);
  }
  
  public editarUsuario(usuario: Usuarios) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario);
  }
  
  public borrarUsuario(usuario: Usuarios) {
    return this.http.delete(this.URL_API + `/${usuario._id}`);
  }
}
