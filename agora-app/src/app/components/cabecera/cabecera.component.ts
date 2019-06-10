import { Component, OnInit } from '@angular/core';
import { IniciarSesionService } from "../../services/iniciar-sesion.service";
import { UsuariosService } from "../../services/usuarios.service";

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    public sesion: IniciarSesionService,
    public usuarios: UsuariosService
  ) { }
  
  ngOnInit() {
  }

}
