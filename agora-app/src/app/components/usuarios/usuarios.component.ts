import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit{

  usuarios : any[] = [];
  nick: string;

  constructor(
    public usuariosS: UsuariosService,
    public ruta : ActivatedRoute,
    public router : Router
  ) {
    this.ruta.params
      .subscribe(
        params => {
          this.nick = params['nick'];
          this.buscarUsuariosQuery();
        }
      )
  }

  ngOnInit() {
    if (!this.nick) {
      this.obtenerUsuarios();
    }
  }

  obtenerUsuarios() {
    this.usuariosS.obtenerUsuarios()
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (resultado.type == true){
            this.usuariosS.usuarios = resultado.usuarios as Usuarios[];
          }
          else {
            console.log("no se encuentran usuarios.");
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  buscarUsuariosQuery() {
    this.usuariosS.obtenerUsuariosBusqueda(this.nick)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (resultado.type == true){
            this.usuariosS.usuarios = resultado.usuarios as Usuarios[];
          }
          else {
            console.log("no se encuentran usuarios.");
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
