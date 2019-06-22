import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class IniciarSesionService {
  readonly URL_API = 'http://localhost:80';
  public token : string;

  constructor(
    public http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.token = localStorage.getItem('token');
  }

  public miId(){
    if (this.token) {
      var valoresToken : any = this.jwtHelper.decodeToken(this.token);
      return valoresToken.idUsuario
    }
    console.log("error de token");
  }

  iniciarSesion(nick: string, pass: string): Observable<boolean> {
    return this.http.post<{token: string}>(this.URL_API + '/api/iniciar-sesion', {nick, pass})
      .pipe(
        map(resultado => {
          if (resultado.token){
            localStorage.setItem('token', resultado.token);
            return true;
          }
          return false;
        })
      );
  }

  registrarse(nombre: string, apellidos: string, nick: string, pass: string, fechaCumple: {}): Observable<boolean> {
    return this.http.post<{token: string}>(this.URL_API + '/api/registrarse', {nombre, apellidos, nick, pass, fechaCumple})
      .pipe(
        map(resultado => {
          if (resultado.token){
            localStorage.setItem('token', resultado.token);
            return true;
          }
          return false;
        })
      );
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }

  public get sesionIniciada(): boolean {
    this.token = localStorage.getItem('token');
    if (this.token){
      return true
    }
    return false
  }
}