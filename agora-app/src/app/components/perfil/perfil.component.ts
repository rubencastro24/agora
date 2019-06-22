import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosService } from '../../services/usuarios.service';
import { SeguimientosService } from '../../services/seguimientos.service';
import { IniciarSesionService } from '../../services/iniciar-sesion.service';

import { Usuarios } from '../../models/usuarios';
import { Seguimientos } from '../../models/seguimientos';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [UsuariosService]
})
export class PerfilComponent implements OnInit {

  
  public usuario : Usuarios[] = [];
  public id : Usuarios['_id'];
  public miId : Usuarios['_id'];
  
  public seguimiento : boolean;
  public seguidor : boolean;
  public cambioSeguimientoMensaje : string;
  public seguimientosObjeto : [];
  public seguimientosCantidad : number;
  public seguidoresObjeto : [];
  public seguidoresCantidad : number;


  constructor(
    public usuarioS: UsuariosService,
    public modalService: NgbModal,
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

  seguidoresModal(seguidores) {
    this.modalService.open(seguidores, {backdropClass: 'bg-secondary' });
  }
  seguimientosModal(seguimientos) {
    this.modalService.open(seguimientos, {backdropClass: 'bg-secondary' });
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
              console.log("cambio de seguimiento nulo.");
            }
            else {
              this.cambioSeguimientoMensaje = resultado.status;
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
              console.log("error, seguimientos no encontrados")
            }
            else {
              this.seguimientosObjeto = resultado.data;
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
              console.log("error, seguidores no encontrados")
            }
            else {
              this.seguidoresObjeto = resultado.data;
              this.seguidoresCantidad = resultado.data.length;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}