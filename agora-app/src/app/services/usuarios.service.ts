import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { CabecerasService } from '../services/cabeceras.service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  /* seleccionarUsuario : Usuarios; */
  usuarios : Usuarios[];
  busqueda : string;
  URL_API = 'http://localhost:80/api/usuarios'

  constructor(private http : HttpClient, private cabecerasS: CabecerasService) {
    /* this.seleccionarUsuario = new Usuarios(); */
  }

  obtenerUsuarios() {
    this.cabecerasS.setHeaders();
    return this.http.get(this.URL_API, this.cabecerasS.cabeceras);
  }

  obtenerUsuariosBusqueda() {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/buscar/${this.busqueda}`, this.cabecerasS.cabeceras);
  }

  obtenerUsuario(id: Usuarios['_id']) {
    this.cabecerasS.setHeaders();
    return this.http.get(`${this.URL_API}/${id}`, this.cabecerasS.cabeceras);
  }

  /*   obtenerUsuario(usuario: Usuarios) {
      this.cabecerasS.setHeaders();
      return this.http.get(this.URL_API + `/${usuario.id}`, this.cabecerasS.cabeceras);
    } */
  
  crearUsuario(usuario: Usuarios) {
    return this.http.post(this.URL_API, usuario/* , {headers: this.cabeceras} */);
  }
  
  editarUsuario(usuario: Usuarios) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario);
  }
  
  borrarUsuario(usuario: Usuarios) {
    return this.http.delete(this.URL_API + `/${usuario._id}`);
  }
}
