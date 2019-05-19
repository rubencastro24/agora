import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  seleccionarUsuario: Usuarios;
  usuarios: Usuarios[];
  
  readonly URL_API = 'http://localhost:3000/api/usuarios'

  constructor(private http: HttpClient) {
    this.seleccionarUsuario = new Usuarios();
  }

  obtenerUsuarios() {
    return this.http.get(this.URL_API);
  }

  obtenerUsuario(usuario: Usuarios) {
    return this.http.get(this.URL_API + `/${usuario._id}`);
  }

  crearUsuario(usuario: Usuarios) {
    return this.http.post(this.URL_API, usuario);
  }
  
  editarUsuario(usuario: Usuarios) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario);
  }
  
  borrarUsuario(usuario: Usuarios) {
    return this.http.delete(this.URL_API + `/${usuario._id}`);
  }
}
