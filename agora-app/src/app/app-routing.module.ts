import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IniciarSesionGuard } from "./guards/iniciar-sesion.guard";

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: IniciarSesionComponent },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [IniciarSesionGuard] },
  { path: 'usuarios/buscar/:nick', component: UsuariosComponent, canActivate: [IniciarSesionGuard] },
  { path: 'usuarios/:id', component: PerfilComponent, canActivate: [IniciarSesionGuard] },
  
  { path: '404', component: NoEncontradoComponent },
  { path: '', redirectTo: '', pathMatch: 'full', canActivate: [IniciarSesionGuard] },
  { path: '**', /*redirectTo: '404',*/ component: NoEncontradoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {  }
