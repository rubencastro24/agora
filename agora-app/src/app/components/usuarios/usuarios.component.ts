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

  constructor(public usuariosServicio: UsuariosService) {
    
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosServicio.obtenerUsuarios()
      .subscribe(res => {
        this.usuariosServicio.usuarios = res as Usuarios[];
      });
  }

}
