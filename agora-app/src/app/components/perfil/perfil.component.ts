import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { SeguimientosService } from '../../services/seguimientos.service';
import { IniciarSesionService } from '../../services/iniciar-sesion.service';
import { Usuarios } from 'src/app/models/usuarios';
import { Seguimientos } from 'src/app/models/seguimientos';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuariosService]
})
export class PerfilComponent implements OnInit {

  public usuario : Usuarios[] = [];
  public id : string;
  public miId : string;

  public seguimiento : boolean;
  public seguimientoObjeto : Seguimientos;

  public seguidor : boolean;
  public seguidorObjeto : Seguimientos;
  
  public cambio : boolean;
  public cambioMensaje : string;
  
  public seguimientos : boolean;
  public seguimientosObjeto : [];
  public seguimientosCantidad : number;
  
  public seguidores : boolean;
  public seguidoresObjeto : [];
  public seguidoresCantidad : number;

  public seguidoresUsuarios : any;


  constructor(
    public usuarioS: UsuariosService,
    public sesionS: IniciarSesionService,
    public seguimientosS: SeguimientosService,
    public ruta : ActivatedRoute,
    public router : Router
  ){
    this.ruta.params
      .subscribe(
        params => {
          this.id = params['id'];
          this.miId = this.sesionS.miId();
          this.obtenerUsuario();
          this.obtenerSeguimientosPerfil();
          this.obtenerSeguidoresPerfil();
          
          if (this.id != this.miId){
            this.obtenerSeguimientoPerfil();
            this.obtenerSeguidorPerfil();
          }
        }
      )
  }
      
  ngOnInit() {
  }

  obtenerUsuario() {
    this.usuarioS.obtenerUsuario(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (resultado.usuario) {
            this.usuario = resultado.usuario;
          }
          else {
            console.log("usuario no encontrado.");
            this.router.navigate(['404']);
          }
        },
        error =>{
          console.log(error);
        }
      );
  }

  obtenerSeguimientoPerfil() {
    this.seguimientosS.obtenerSeguimiento(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (!resultado.type) {
            console.log("error seguimiento.")
          }
          else {
            if (!resultado.seguimiento) {
              this.seguimiento = false;
            }
            else {
              this.seguimiento = true;
              this.seguimientoObjeto = resultado.data;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  obtenerSeguidorPerfil() {
    this.seguimientosS.obtenerSeguidor(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (!resultado.type) {
            console.log("error seguidor.")
          }
          else {
            if (!resultado.seguidor) {
              this.seguidor = false;
            }
            else {
              this.seguidor = true;
              this.seguidorObjeto = resultado.data;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  cambiarSeguimientoPerfil() {
    this.seguimientosS.cambiarSeguimiento(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (!resultado.type) {
            console.log("error seguimiento.")
          }
          else {
            if (!resultado.cambio) {
              this.cambio = false;
            }
            else {
              this.cambio = true;
              this.cambioMensaje = resultado.status;
              this.obtenerSeguimientoPerfil();
              this.obtenerSeguimientosPerfil();
              this.obtenerSeguidoresPerfil();
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  
  obtenerSeguimientosPerfil() {
    this.seguimientosS.obtenerSeguimientos(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (!resultado.type) {
            console.log("error seguimiento.")
          }
          else {
            if (!resultado.seguimientos) {
              this.seguimientos = false;
            }
            else {
              this.seguimientos = true;
              this.seguimientosObjeto = resultado.data;
              console.log(this.seguimientosObjeto);
              this.seguimientosCantidad = resultado.data.length;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  
  obtenerSeguidoresPerfil() {
    this.seguimientosS.obtenerSeguidores(this.id)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (!resultado.type) {
            console.log("error seguimiento.")
          }
          else {
            if (!resultado.seguidores) {
              this.seguidores = false;
            }
            else {
              this.seguidores = true;
              this.seguidoresObjeto = resultado.data;
              console.log(this.seguidoresObjeto);
              this.seguidoresCantidad = resultado.data.length;
              this.seguidoresNick();
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  seguidoresNick() {
    this.seguimientosS.SeguidoresNick(this.seguidoresObjeto)
      .subscribe(
        respuesta => {
          var resultado : any = respuesta;
          if (!resultado.type) {
            console.log("error seguimiento.")
          }
          else {
            if (!resultado.usuarios) {
              this.seguidoresUsuarios = false;
            }
            else {
              this.seguidoresUsuarios = resultado.data;
            }
            console.log(this.seguidoresUsuarios)
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  seguimientosNick() {
  }

  

}