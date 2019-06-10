import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit{

  usuarios : any[] = [];

  constructor(public usuariosS: UsuariosService) { }

  ngOnInit() {
    this.obtenerUsuarios();
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

}
