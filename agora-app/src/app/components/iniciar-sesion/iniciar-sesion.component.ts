import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { IniciarSesionService } from "../../services/iniciar-sesion.service";
import { IniciarSesionGuard } from "../../guards/iniciar-sesion.guard";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  providers: [
    IniciarSesionService,
    IniciarSesionGuard
  ]
})
export class IniciarSesionComponent implements OnInit{
  public nickR: string;
  public passR: string;

  public nick: string;
  public pass: string;
  public nombre: string;
  public apellidos: string;
  public fecha: string;
  public fechaCumple : any;
  public edad : number;
  public limiteEdad: number = 18;
  
  public errorI: string;
  public errorR: string;

  constructor(
    public sesion: IniciarSesionService,
    public router: Router
  ) { }

  public iniciarSesion() {
    this.sesion.iniciarSesion(this.nick, this.pass)
      .pipe(first())
      .subscribe(
        resultado => {
          if (resultado == true){
            this.router.navigate(['']);
          }
          else {
            this.errorI = 'Error de autenticación.';
          }
        },
        error => {
          this.errorI = 'Error de autenticación. ' + error;
        }
      );
  }

  calcularEdad(){
    var fechaSeparada : any[] = this.fecha.split('-');
    this.fechaCumple = {
      dia: fechaSeparada[2],
      mes: fechaSeparada[1],
      año: fechaSeparada[0]
    };
    var fechaHoy : Date = new Date();
    if ( fechaHoy.getMonth() > this.fechaCumple.mes ||
      fechaHoy.getMonth() == this.fechaCumple.mes && fechaHoy.getDate() >= this.fechaCumple.dia ){
      this.edad = fechaHoy.getFullYear() - this.fechaCumple.año;
    }
    else{
      this.edad = fechaHoy.getFullYear() - this.fechaCumple.año - 1;
    }
  }

  public registrar() {
    this.calcularEdad();
    console.log(this.edad);
    if (this.edad >= this.limiteEdad){
      console.log(this.edad);
      let nick = this.nickR;
      let pass = this.passR;

      this.sesion.registrarse(this.nombre, this.apellidos, nick, pass, this.fechaCumple)
      .subscribe(
        resultado => {
          if (resultado == true){
            this.router.navigate(['']);
          }
          else {
            this.errorR = 'El usuario ya existe.';
          }
        },
        error => {
          this.errorR = 'Error de registro. ' + error;
        }
        );
    }
    else {
      this.errorR = `Debes de ser mayor de ${this.limiteEdad} años.`;
    }
  }




  ngOnInit(){}
}
