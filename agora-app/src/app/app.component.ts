import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { IniciarSesionService } from "./services/iniciar-sesion.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private sesion: IniciarSesionService,
    private router: Router
  ) {}

  cerrarSesion() {
    this.sesion.cerrarSesion();
    this.router.navigate(['iniciar-sesion']);
  }
}