import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { IniciarSesionService } from "../services/iniciar-sesion.service"
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class IniciarSesionGuard implements CanActivate {
  constructor(
    public router: Router,
    public http: HttpClient,
    public iniciarSesionS: IniciarSesionService,
    public jwtHelper: JwtHelperService
  ) { }
  
  readonly URL_API = 'http://localhost:80'

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token : string = localStorage.getItem('token');
		if (!token) {
      this.router.navigate(['iniciar-sesion']);
      return false;
    }
    else {
      if (this.jwtHelper.isTokenExpired(token)){
        this.iniciarSesionS.cerrarSesion();
        this.router.navigate(['iniciar-sesion']);
        return false;
      }
      return true;
    }
  }

}