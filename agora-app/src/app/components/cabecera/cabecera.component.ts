import { Component, OnInit } from '@angular/core';
import { IniciarSesionService } from "../../services/iniciar-sesion.service";
import { UsuariosService } from "../../services/usuarios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  public nick : string;
  public error : string;

  constructor(
    public sesionS: IniciarSesionService,
    public usuariosS: UsuariosService,
    public router: Router
  ) {
  }

  public buscarUsuario(){
    if (this.nick) {
      this.router.navigate(['/usuarios/buscar/'+ this.nick]);
    }
  }

  ngOnInit() {
  }

}
