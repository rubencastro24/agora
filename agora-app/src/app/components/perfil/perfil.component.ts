import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuarios } from 'src/app/models/usuarios';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuariosService]
})
export class PerfilComponent implements OnInit {

  public usuarios : any[] = [];
  public id : string;

  constructor(
    public usuarioS: UsuariosService,
    public ruta : ActivatedRoute
  ){
    this.ruta.params.subscribe(
      params => {this.id = params['id'];}
    )
  }

  ngOnInit() {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.usuarioS.obtenerUsuario(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          this.usuarioS.usuarios = resultado.usuario as Usuarios[];
        },
        error =>{
          console.log(error);
        }
      );
  }

}