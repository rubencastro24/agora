import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class IniciarSesionService {
  constructor(
    public http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }
  readonly URL_API = 'http://localhost:80';
  public token : string = localStorage.getItem('token');
  
  miId(){
    if (this.token) {
      var valoresToken : any = this.jwtHelper.decodeToken(this.token);
      return valoresToken.idUsuario
    }
    console.log("error de token");
  }

  iniciarSesion(nick: string, pass: string): Observable<boolean> {
    return this.http.post<{token: string}>(this.URL_API + '/api/iniciar-sesion', {nick, pass})
      .pipe(
        map(result => {
          if (result.token){
            localStorage.setItem('token', result.token);
            return true;
          }
          return false;
        })
      );
  }

  registrarse(nombre: string, apellidos: string, nick: string, pass: string, fechaCumple: {}): Observable<boolean> {
    return this.http.post<{token: string}>(this.URL_API + '/api/registrarse', {nombre, apellidos, nick, pass, fechaCumple})
      .pipe(
        map(result => {
          if (result.token){
            localStorage.setItem('token', result.token);
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
    if (this.token){
      return true
    }
    return false
    //return (localStorage.getItem('token') !== "null" && localStorage.getItem('token') !== "undefined");
  }
}